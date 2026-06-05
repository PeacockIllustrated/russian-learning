"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getLesson } from "@/content/curriculum";
import { newCard, review, type ReviewGrade } from "@/lib/srs";

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

// records a completed lesson and advances the daily streak. no-op when signed out.
export async function saveLessonProgress(
  unitPosition: number,
  lessonPosition: number,
  score: number | null,
): Promise<{ saved: boolean; streak?: number }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { saved: false };

  await supabase.from("russ_lesson_progress").upsert(
    {
      owner: user.id,
      unit_position: unitPosition,
      lesson_position: lessonPosition,
      score,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "owner,unit_position,lesson_position" },
  );

  const today = isoDate(new Date());
  const yesterday = isoDate(new Date(Date.now() - 86_400_000));
  const { data: profile } = await supabase
    .from("russ_profiles")
    .select("streak_days,last_active")
    .eq("id", user.id)
    .maybeSingle();

  let streak = profile?.streak_days ?? 0;
  const last = profile?.last_active ?? null;
  if (last !== today) {
    streak = last === yesterday ? streak + 1 : 1;
    await supabase
      .from("russ_profiles")
      .upsert({ id: user.id, streak_days: streak, last_active: today }, { onConflict: "id" });
  }

  // turn the lesson's phrases into review cards, keeping any existing schedule
  const found = getLesson(unitPosition, lessonPosition);
  if (found && found.lesson.phrases.length) {
    const now = new Date();
    const cards = found.lesson.phrases.map((p) => {
      const c = newCard(now);
      return {
        owner: user.id,
        ru: p.cyrillic,
        en: p.gloss,
        translit: p.translit,
        stability: c.stability,
        difficulty: c.difficulty,
        reps: c.reps,
        lapses: c.lapses,
        due_at: c.due_at,
        last_reviewed: c.last_reviewed,
      };
    });
    await supabase.from("russ_review_cards").upsert(cards, { onConflict: "owner,ru", ignoreDuplicates: true });
  }

  revalidatePath("/journey");
  return { saved: true, streak };
}

// marks a Cyrillic letter reactivated. no-op when signed out.
export async function reactivateLetter(glyph: string): Promise<{ saved: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { saved: false };

  await supabase.from("russ_letter_progress").upsert(
    { owner: user.id, glyph, reactivated: true, reviewed_at: new Date().toISOString() },
    { onConflict: "owner,glyph" },
  );
  return { saved: true };
}

// grades a due review card and reschedules it through FSRS. no-op when signed out.
export async function gradeCard(cardId: string, grade: ReviewGrade): Promise<{ ok: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false };

  const { data: card } = await supabase
    .from("russ_review_cards")
    .select("*")
    .eq("id", cardId)
    .eq("owner", user.id)
    .single();
  if (!card) return { ok: false };

  const next = review(
    {
      stability: card.stability,
      difficulty: card.difficulty,
      reps: card.reps,
      lapses: card.lapses,
      due_at: card.due_at,
      last_reviewed: card.last_reviewed,
    },
    grade,
  );

  await supabase
    .from("russ_review_cards")
    .update({
      stability: next.stability,
      difficulty: next.difficulty,
      reps: next.reps,
      lapses: next.lapses,
      due_at: next.due_at,
      last_reviewed: next.last_reviewed,
    })
    .eq("id", cardId)
    .eq("owner", user.id);

  return { ok: true };
}


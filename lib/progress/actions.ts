"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

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

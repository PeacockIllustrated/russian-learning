import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { curriculum } from "@/content/curriculum";
import { letterCount } from "@/lib/content/cyrillic";

const totalLessons = curriculum.reduce((n, u) => n + u.lessons.length, 0);

export default async function StatsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="pt-2">
        <h1 className="font-display text-lg font-extrabold">Stats</h1>
        <p className="mb-4 mt-1 text-xs text-greyish">Sign in to track your streak and progress.</p>
        <Link
          href="/login"
          className="block rounded-card border-2 border-dashed border-ink bg-paper2 px-4 py-3 text-center text-xs font-semibold"
        >
          Sign in to see your stats
        </Link>
      </div>
    );
  }

  const [profileRes, progressRes, deckRes, lettersRes] = await Promise.all([
    supabase.from("russ_profiles").select("streak_days").eq("id", user.id).maybeSingle(),
    supabase.from("russ_lesson_progress").select("unit_position,score").eq("owner", user.id),
    supabase.from("russ_review_cards").select("id", { count: "exact", head: true }).eq("owner", user.id),
    supabase
      .from("russ_letter_progress")
      .select("glyph", { count: "exact", head: true })
      .eq("owner", user.id)
      .eq("reactivated", true),
  ]);

  const streak = profileRes.data?.streak_days ?? 0;
  const progress = progressRes.data ?? [];
  const lessonsDone = progress.length;
  const deckCount = deckRes.count ?? 0;
  const lettersDone = lettersRes.count ?? 0;

  const scored = progress.filter((r) => typeof r.score === "number");
  const avgScore = scored.length
    ? Math.round(scored.reduce((s, r) => s + (r.score as number), 0) / scored.length)
    : null;

  const doneByUnit = new Map<number, number>();
  for (const r of progress) doneByUnit.set(r.unit_position, (doneByUnit.get(r.unit_position) ?? 0) + 1);
  const bars = curriculum
    .filter((u) => u.lessons.length > 0)
    .map((u) => ({
      position: u.position,
      frac: Math.min(1, (doneByUnit.get(u.position) ?? 0) / u.lessons.length),
    }));

  return (
    <div className="pt-2">
      <h1 className="font-display text-lg font-extrabold">Stats</h1>
      <p className="mb-4 mt-1 text-xs text-greyish">Your progress so far.</p>

      <div className="grid grid-cols-2 gap-3">
        <Tile value={String(streak)} label="day streak" />
        <Tile value={`${lessonsDone}/${totalLessons}`} label="lessons done" />
        <Tile value={String(deckCount)} label={deckCount === 1 ? "word in deck" : "words in deck"} />
        <Tile value={`${lettersDone}/${letterCount}`} label="letters reactivated" />
      </div>

      <section className="mt-5 rounded-card border-[3px] border-ink bg-paper p-4 shadow-comic-sm">
        <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[1.4px] text-greyish">Progress by unit</h2>
        <div className="flex items-end gap-1.5">
          {bars.map((b) => (
            <div key={b.position} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="relative flex h-28 w-full max-w-[26px] items-end overflow-hidden rounded-[6px] border-[3px] border-ink bg-paper2">
                <div className="w-full bg-ink" style={{ height: `${Math.round(b.frac * 100)}%` }} />
              </div>
              <span className="text-[9px] font-bold text-greyish">{b.position}</span>
            </div>
          ))}
        </div>
      </section>

      {avgScore !== null ? (
        <div className="mt-4 flex items-center justify-between rounded-card border-[3px] border-ink bg-paper px-4 py-3 shadow-comic-sm">
          <span className="text-[11px] font-semibold text-greyish">Average lesson score</span>
          <span className="font-display text-lg font-extrabold">{avgScore}%</span>
        </div>
      ) : null}
    </div>
  );
}

function Tile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-card border-[3px] border-ink bg-paper p-4 shadow-comic-sm">
      <div className="font-display text-3xl font-black leading-none">{value}</div>
      <div className="mt-1.5 text-[11px] font-semibold text-greyish">{label}</div>
    </div>
  );
}

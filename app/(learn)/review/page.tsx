import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ReviewQueue } from "@/components/review/ReviewQueue";

export default async function ReviewPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="pt-2">
        <h1 className="font-display text-lg font-extrabold">Review</h1>
        <p className="mb-4 mt-1 text-xs text-greyish">Sign in to build and review your word deck.</p>
        <Link
          href="/login"
          className="block rounded-card border-2 border-dashed border-ink bg-paper2 px-4 py-3 text-center text-xs font-semibold"
        >
          Sign in to save and review
        </Link>
      </div>
    );
  }

  const { data } = await supabase
    .from("russ_review_cards")
    .select("id,ru,en,translit")
    .eq("owner", user.id)
    .lte("due_at", new Date().toISOString())
    .order("due_at")
    .limit(40);

  return (
    <div className="pt-2">
      <h1 className="font-display text-lg font-extrabold">Review</h1>
      <p className="mb-2 mt-1 text-xs text-greyish">Spaced review of the words you have met.</p>
      <ReviewQueue cards={data ?? []} />
    </div>
  );
}

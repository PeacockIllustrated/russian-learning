import { createClient } from "@/lib/supabase/server";
import { AlphabetScreen } from "@/components/alphabet/AlphabetScreen";

export default async function AlphabetPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let initialReactivated: string[] = [];
  if (user) {
    const { data } = await supabase
      .from("russ_letter_progress")
      .select("glyph")
      .eq("owner", user.id)
      .eq("reactivated", true);
    initialReactivated = (data ?? []).map((row) => row.glyph);
  }

  return <AlphabetScreen initialReactivated={initialReactivated} />;
}

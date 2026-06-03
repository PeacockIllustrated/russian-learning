import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/types";

// makes sure the signed in user has a russ_profiles row, created on first visit.
// RLS lets a user insert and read only their own profile.
export async function ensureProfile(): Promise<Tables<"russ_profiles"> | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  await supabase
    .from("russ_profiles")
    .upsert({ id: user.id }, { onConflict: "id", ignoreDuplicates: true });

  const { data } = await supabase
    .from("russ_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return data;
}

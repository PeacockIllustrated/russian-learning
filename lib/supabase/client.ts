import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/supabase/types";

// browser client for client components, phase 1 onward
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

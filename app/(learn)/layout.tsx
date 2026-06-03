import type { ReactNode } from "react";
import { createClient } from "@/lib/supabase/server";
import { ensureProfile } from "@/lib/supabase/profile";
import { TopBar } from "@/components/shell/TopBar";
import { BottomNav } from "@/components/shell/BottomNav";
import { firstUnit } from "@/content/spine";

// mobile-first app shell: fixed top bar, scrollable middle, fixed bottom nav.
// auth is optional: signed-in users get their profile, everyone else gets defaults.
export default async function LearnLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const profile = user ? await ensureProfile() : null;

  return (
    <div className="mx-auto flex h-dvh w-full max-w-[480px] flex-col overflow-hidden bg-paper">
      <TopBar
        unitPosition={firstUnit.position}
        unitTitle={firstUnit.title}
        streak={profile?.streak_days ?? 0}
        signedIn={!!user}
      />
      <main className="no-scrollbar flex-1 overflow-y-auto px-4 pb-5">{children}</main>
      <BottomNav />
    </div>
  );
}

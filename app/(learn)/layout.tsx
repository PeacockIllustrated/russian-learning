import type { ReactNode } from "react";
import { TopBar } from "@/components/shell/TopBar";
import { BottomNav } from "@/components/shell/BottomNav";
import { firstUnit } from "@/content/spine";

// mobile-first app shell: fixed top bar, scrollable middle, fixed bottom nav.
// the paper column sits on the paper2 halftone backdrop, as in the gallery.
export default function LearnLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex h-dvh w-full max-w-[480px] flex-col overflow-hidden bg-paper">
      <TopBar unitPosition={firstUnit.position} unitTitle={firstUnit.title} streak={0} />
      <main className="no-scrollbar flex-1 overflow-y-auto px-4 pb-5">{children}</main>
      <BottomNav />
    </div>
  );
}

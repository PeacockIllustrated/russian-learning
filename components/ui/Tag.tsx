import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-tag border-2 border-ink px-2.5 py-1 text-[9px] font-bold uppercase tracking-[1.4px]",
        className,
      )}
    >
      {children}
    </span>
  );
}

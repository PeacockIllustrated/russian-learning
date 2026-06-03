import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  inert?: boolean;
  className?: string;
};

// the press collapse (shadow to nothing, chunk depresses) is the reference button
// feedback. inert renders the chunk without the press, for not-yet-wired actions.
export function Button({ children, variant = "primary", size = "md", inert, className }: ButtonProps) {
  return (
    <button
      type="button"
      disabled={inert}
      className={cn(
        "inline-flex items-center justify-center border-ink font-display font-extrabold",
        size === "md" && "rounded-[13px] border-[3px] px-4 py-3 text-[13px] shadow-comic-sm",
        size === "sm" && "rounded-[9px] border-2 px-3.5 py-2 text-[11px]",
        variant === "primary" ? "bg-ink text-paper" : "bg-paper text-ink",
        !inert && "transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
        inert && "cursor-default",
        className,
      )}
    >
      {children}
    </button>
  );
}

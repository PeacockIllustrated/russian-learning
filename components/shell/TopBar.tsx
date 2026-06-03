import Link from "next/link";
import { SignOutButton } from "@/components/auth/SignOutButton";

function Flame({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2c1 4-2 5-2 8a4 4 0 008 0c0-2-1-3-1-3 2 1 3 4 3 6a8 8 0 11-16 0c0-5 5-7 8-11z" />
    </svg>
  );
}

// the streak chip stays ink at rest; the vermilion flame is for a gain only, not here
export function TopBar({
  unitPosition,
  unitTitle,
  streak,
  signedIn = false,
}: {
  unitPosition: number;
  unitTitle: string;
  streak: number;
  signedIn?: boolean;
}) {
  return (
    <header className="flex shrink-0 items-center justify-between px-4 pb-3 pt-4">
      <div>
        <div className="font-display text-[13px] font-extrabold leading-none">Unit {unitPosition}</div>
        <div className="mt-1 text-[10px] font-medium uppercase tracking-[1px] text-greyish">{unitTitle}</div>
      </div>
      <div className="flex items-center gap-2">
        {signedIn ? (
          <SignOutButton />
        ) : (
          <Link
            href="/login"
            className="rounded-tag border-2 border-ink bg-paper px-3 py-1 font-display text-[11px] font-extrabold text-ink shadow-comic-sm"
          >
            Sign in
          </Link>
        )}
        <div className="flex items-center gap-1.5 rounded-tag bg-ink px-2.5 py-1 font-display text-xs font-bold text-paper shadow-comic-sm">
          <Flame className="h-3.5 w-3.5" />
          <span>{streak}</span>
        </div>
      </div>
    </header>
  );
}

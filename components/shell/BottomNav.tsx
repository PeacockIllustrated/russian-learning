"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

type Item = { key: string; label: string; href: string | null };

// journey and alphabet are wired this phase; practice and stats render but stay
// inert until their phases land
const items: Item[] = [
  { key: "journey", label: "Journey", href: "/journey" },
  { key: "practice", label: "Practice", href: null },
  { key: "alphabet", label: "Alphabet", href: "/alphabet" },
  { key: "stats", label: "Stats", href: null },
];

function NavIcon({ name, className }: { name: string; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };
  switch (name) {
    case "journey":
      return (
        <svg {...common}>
          <path d="M4 12l8-8 8 8M6 10v10h12V10" />
        </svg>
      );
    case "practice":
      return (
        <svg {...common}>
          <path d="M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3zM6 12a6 6 0 0012 0M12 18v3" />
        </svg>
      );
    case "alphabet":
      return (
        <svg {...common}>
          <path d="M5 19l4-12 4 12M6 15h6M16 7v12M16 7h3a3 3 0 010 6h-3" />
        </svg>
      );
    case "stats":
      return (
        <svg {...common}>
          <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
        </svg>
      );
    default:
      return null;
  }
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="flex shrink-0 justify-around border-t-[3px] border-ink bg-paper px-1.5 pb-3 pt-2.5">
      {items.map((it) => {
        const current = it.href ? pathname.startsWith(it.href) : false;
        const inner = (
          <span
            className={cn(
              "flex flex-col items-center gap-0.5 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide",
              current ? "text-ink" : "text-greyish",
            )}
          >
            <NavIcon name={it.key} className={cn("h-[22px] w-[22px]", current ? "stroke-ink" : "stroke-greyish")} />
            {it.label}
          </span>
        );

        return it.href ? (
          <Link key={it.key} href={it.href} aria-current={current ? "page" : undefined}>
            {inner}
          </Link>
        ) : (
          <span key={it.key} aria-disabled="true">
            {inner}
          </span>
        );
      })}
    </nav>
  );
}

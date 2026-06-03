import { signOut } from "@/app/login/actions";

export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        aria-label="Sign out"
        className="grid h-8 w-8 place-items-center rounded-full border-2 border-ink bg-paper text-ink shadow-comic-sm transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M16 17l5-5-5-5M21 12H9M12 19H5V5h7" />
        </svg>
      </button>
    </form>
  );
}

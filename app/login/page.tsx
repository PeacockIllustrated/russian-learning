import { signIn, signUp } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; notice?: string }>;
}) {
  const sp = await searchParams;

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col justify-center px-6 py-10">
      <div className="mb-8 text-center">
        <h1
          className="font-display text-4xl font-black leading-none"
          style={{ textShadow: "3px 3px 0 var(--paper3), 4px 4px 0 var(--ink)" }}
        >
          учим
          <br />
          russian
        </h1>
        <p className="mt-4 text-xs text-greyish">Sign in to keep your journey.</p>
      </div>

      <form className="flex flex-col gap-2 rounded-card border-[3px] border-ink bg-paper p-5 shadow-comic">
        <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[1.4px] text-greyish">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="rounded-[11px] border-[3px] border-ink bg-paper px-3.5 py-3 text-sm font-semibold outline-none focus:bg-paper2"
        />
        <label htmlFor="password" className="mt-2 text-[10px] font-bold uppercase tracking-[1.4px] text-greyish">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete="current-password"
          className="rounded-[11px] border-[3px] border-ink bg-paper px-3.5 py-3 text-sm font-semibold outline-none focus:bg-paper2"
        />

        {sp.error ? (
          <p className="mt-2 rounded-[11px] border-2 border-dashed border-ink bg-paper2 px-3.5 py-2.5 text-xs">
            {sp.error}
          </p>
        ) : null}
        {sp.notice ? (
          <p className="mt-2 rounded-[11px] border-2 border-ink bg-paper2 px-3.5 py-2.5 text-xs">{sp.notice}</p>
        ) : null}

        <div className="mt-3 flex gap-2.5">
          <button
            formAction={signIn}
            className="flex-1 rounded-[13px] border-[3px] border-ink bg-ink px-4 py-3 font-display text-[13px] font-extrabold text-paper shadow-comic-sm transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
          >
            Sign in
          </button>
          <button
            formAction={signUp}
            className="flex-1 rounded-[13px] border-[3px] border-ink bg-paper px-4 py-3 font-display text-[13px] font-extrabold text-ink shadow-comic-sm transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
          >
            Create account
          </button>
        </div>
      </form>
    </main>
  );
}

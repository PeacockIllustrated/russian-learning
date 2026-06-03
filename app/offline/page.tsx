export const metadata = { title: "Offline" };

export default function Offline() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col items-center justify-center px-6 text-center">
      <div className="rounded-card border-[3px] border-ink bg-paper p-6 shadow-comic">
        <h1 className="font-display text-xl font-extrabold">You are offline</h1>
        <p className="mt-2 text-xs leading-relaxed text-greyish">
          The journey needs a connection. Reconnect and it will pick up where you left off.
        </p>
      </div>
    </main>
  );
}

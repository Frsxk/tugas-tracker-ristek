import Link from "next/link";

const ctaLinks = [
  { href: "/register", label: "Create an account" },
  { href: "/task-tracker", label: "Go to tracker", variant: "ghost" as const },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white px-6 py-16 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Student productivity helper
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
          Keep every course, task, and deadline in one confident view.
        </h1>
        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-300">
          Tugas Tracker centralizes coursework, tasks, and progress. Stay organized, meet deadlines, and boost your academic success with ease.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {ctaLinks.map((cta) => (
            <Link
              key={cta.href}
              href={cta.href}
              className={[
                "inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition sm:w-auto",
                cta.variant === "ghost"
                  ? "border border-transparent text-zinc-700 hover:bg-zinc-800 hover:text-white"
                  : "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700",
              ].join(" ")}
            >
              {cta.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 -bottom-32 flex justify-center opacity-60 blur-3xl">
        <div className="h-64 w-64 rounded-full bg-blue-200/60 dark:bg-blue-500/20" />
      </div>
    </section>
  );
}

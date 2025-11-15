import Link from "next/link";
import { ThemeToggle } from "@/components/common/theme-toggle";

const featureLinks = [
  { href: "/course-management", label: "Course Management" },
  { href: "/task-management", label: "Task Management" },
  { href: "/task-tracker", label: "Task Tracker" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-zinc-400 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:border-zinc-600 dark:text-zinc-300">
            Logo
          </div>
          <div>
            <span className="block text-lg font-semibold text-zinc-900 dark:text-white">
              Tugas Tracker
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-zinc-600 dark:text-zinc-300 md:flex">
          {featureLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-zinc-900 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-transparent hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800 sm:inline-flex"
          >
            Log in
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

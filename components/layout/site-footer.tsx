import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/course-management", label: "Course Management" },
  { href: "/task-management", label: "Task Management" },
  { href: "/task-tracker", label: "Task Tracker" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Tugas Tracker Logo" width={50} height={50} className="rounded-full" />
          <div>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Tugas Tracker
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-500 dark:text-zinc-400">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-zinc-900 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} Frsxk. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

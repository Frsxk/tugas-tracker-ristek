import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/nav-links";

export function SiteFooter() {
  return (
    <footer className="bg-md-surface-container-lowest">
      {/* Gradient accent line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-md-primary-container/60 to-transparent" />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Tugas Tracker Logo"
            width={36}
            height={36}
            className="rounded-xl opacity-80"
          />
          <span className="text-base font-semibold text-md-on-surface">
            Tugas Tracker
          </span>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-md-on-surface-variant md:justify-start">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors duration-200 hover:text-md-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-md-outline">
          © {new Date().getFullYear()} Frsxk. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

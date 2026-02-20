'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { NAV_LINKS } from '@/lib/nav-links';
import { useAuth } from '@/lib/use-auth';

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoggedIn } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDropdown]);

  const handleLogout = async () => {
    try {
      await api.logout();
      localStorage.removeItem('user');
      toast.success('Logged out successfully!');
      router.push('/login');
      router.refresh();
    } catch {
      toast.error('Logout failed');
    }
  };

  const isActive = (href: string) => pathname === href;

  return (
    <div className="sticky top-0 z-20 px-3 pt-2 sm:px-6 lg:px-8 sm:pt-3">
      <header className="mx-auto max-w-6xl rounded-2xl bg-md-surface-container/90 shadow-lg shadow-black/10 backdrop-blur-xl sm:rounded-[20px]">
        {/* Gradient accent line */}
        <div className="h-[2px] rounded-t-[20px] bg-gradient-to-r from-md-primary via-[#E8B4CB] to-md-primary" />

        <div className="flex items-center justify-between px-5 py-2.5">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Tugas Tracker Logo"
              width={36}
              height={36}
              className="rounded-xl transition-transform duration-200 group-hover:scale-105"
            />
            <span className="text-lg font-semibold text-md-on-surface">
              Tugas Tracker
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-md-primary-container/70 text-md-on-primary-container'
                    : 'text-md-on-surface-variant hover:bg-md-surface-container-highest hover:text-md-on-surface'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="hidden items-center gap-2 rounded-full bg-md-secondary-container px-4 py-2 text-sm font-medium text-md-on-secondary-container transition hover:brightness-110 sm:inline-flex"
                >
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  {user?.name}
                </button>
                <div
                  className={`absolute right-0 top-full mt-2 w-40 rounded-2xl bg-md-surface-container-high shadow-xl shadow-black/15 transition-all duration-200 origin-top ${
                    showDropdown
                      ? 'scale-100 opacity-100'
                      : 'pointer-events-none scale-95 opacity-0'
                  }`}
                >
                  <div className="p-1.5">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-md-error transition hover:bg-md-error-container/30"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-full bg-md-primary px-5 py-2 text-sm font-semibold text-md-on-primary shadow-md shadow-md-primary/20 transition hover:brightness-110 hover:shadow-lg sm:inline-flex"
              >
                Log in
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center rounded-full p-2 text-md-on-surface-variant transition hover:bg-md-surface-container-highest md:hidden"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined">
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="h-px mx-4 bg-md-outline-variant/20" />
          <nav className="flex flex-col gap-1 p-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-md-primary-container/70 text-md-on-primary-container'
                    : 'text-md-on-surface-variant hover:bg-md-surface-container-highest'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px mx-1 my-1 bg-md-outline-variant/20" />
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-md-error transition hover:bg-md-error-container/20"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                Log out
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-2xl bg-md-primary px-4 py-3 text-sm font-semibold text-md-on-primary transition hover:brightness-110"
              >
                <span className="material-symbols-outlined text-[20px]">login</span>
                Log in
              </Link>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
}

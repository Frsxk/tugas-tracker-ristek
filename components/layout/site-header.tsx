'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';

const featureLinks = [
  { href: '/course-management', label: 'Course Management' },
  { href: '/task-management', label: 'Task Management' },
  { href: '/task-tracker', label: 'Task Tracker' },
];

export function SiteHeader() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const userData = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const handleLogout = async () => {
    try {
      await api.logout();
      localStorage.removeItem('user');
      setUser(null);
      toast.success('Logged out successfully!');
      router.push('/login');
    } catch {
      toast.error('Logout failed');
    }
  };
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Tugas Tracker Logo" width={50} height={50} className="rounded-full" />
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
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="hidden rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-transparent hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800 sm:inline-flex"
              >
                Hello, {user.name}
              </button>
              <div className={`absolute right-0 top-full mt-2 w-32 rounded-2xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900 transition-all duration-200 ease-in-out origin-top ${showDropdown ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <button
                  onClick={handleLogout}
                  className="w-full rounded-2xl px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-transparent hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800 sm:inline-flex"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/use-auth';

export function HeroSection() {
  const { isLoggedIn } = useAuth();

  return (
    <section className="animate-fade-in relative overflow-hidden rounded-[20px] bg-md-surface-container px-5 py-14 sm:rounded-[32px] sm:px-10 sm:py-24">
      {/* Gradient shimmer overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-md-primary/8 via-transparent to-md-secondary/6" />

      {/* Cookie decorations — only on sm+ */}
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block">
        <div className="md-cookie md-cookie-4 animate-float -left-12 -top-12 bg-md-primary/12" />
        <div className="md-cookie md-cookie-2 animate-float-reverse right-10 top-8 bg-[#E8B4CB]/15" />
        <div className="md-cookie md-cookie-3 animate-float bottom-10 left-20 bg-[#E8B4CB]/12" />
        <div className="md-cookie md-cookie-1 animate-pulse-glow -bottom-10 -right-8 bg-md-primary/10" />
      </div>

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="md-label-large animate-fade-in delay-1 uppercase tracking-[0.25em] text-[#E8B4CB]">
          Student productivity helper
        </p>
        <h1 className="animate-fade-in delay-2 mt-5 text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          <span className="gradient-text">Keep every course, task, and deadline</span>{' '}
          <span className="text-md-on-surface">in one confident view.</span>
        </h1>
        <p className="md-body-large animate-fade-in delay-3 mt-6 text-md-on-surface-variant">
          Tugas Tracker centralizes coursework, tasks, and progress. Stay
          organized, meet deadlines, and boost your academic success with ease.
        </p>
        <div className="animate-fade-in delay-4 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {/* Primary CTA */}
          <Link
            href={isLoggedIn ? '/task-management' : '/register'}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-md-outline-variant/30 bg-md-surface-container-high px-7 py-3.5 text-sm font-semibold text-md-on-surface shadow-lg shadow-md-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-md-primary/35 hover:brightness-110 sm:w-auto"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isLoggedIn ? 'add_task' : 'person_add'}
            </span>
            {isLoggedIn ? 'Add a task' : 'Create an account'}
          </Link>
          {/* Secondary CTA */}
          <Link
            href="/task-tracker"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-md-outline-variant/30 bg-md-surface-container-high px-7 py-3.5 text-sm font-semibold text-md-on-surface transition-all duration-300 hover:bg-md-surface-container-highest hover:shadow-md sm:w-auto"
          >
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            Go to tracker
          </Link>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from 'next';
import { CourseManagement } from "@/components/sections/course-management";

export const metadata: Metadata = {
  title: 'Course Management | Tugas Tracker',
  description: 'Add, view, and manage your university courses. Organize your semester workload in one place.',
};

export default function CourseManagementPage() {
  return (
    <div className="relative mx-auto w-full max-w-6xl space-y-6 sm:space-y-8">
      {/* Decorative cookies */}
      <div className="pointer-events-none absolute -right-16 -top-8 hidden sm:block">
        <div className="md-cookie md-cookie-4 animate-pulse-glow bg-md-primary/10" />
      </div>
      <div className="pointer-events-none absolute -left-12 bottom-32 hidden sm:block">
        <div className="md-cookie md-cookie-2 animate-float bg-[#E8B4CB]/8" />
      </div>
      <header className="animate-fade-in space-y-2 text-center">
        <p className="md-label-medium uppercase tracking-[0.3em] text-[#E8B4CB]">
          Course management
        </p>
        <h1 className="md-headline-medium text-xl leading-tight sm:text-2xl md:text-3xl">
          <span className="gradient-text">Keep lecturer info, credits,</span>{' '}
          <span className="text-md-on-surface">and milestones tidy.</span>
        </h1>
      </header>
      <CourseManagement />
    </div>
  );
}

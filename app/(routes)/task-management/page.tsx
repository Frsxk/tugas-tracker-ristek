import type { Metadata } from 'next';
import { TaskManagement } from "@/components/sections/task-management";

export const metadata: Metadata = {
  title: 'Task Management | Tugas Tracker',
  description: 'Create, track, and manage your assignments. Stay on top of deadlines and never miss a task.',
};

export default function TaskManagementPage() {
  return (
    <div className="relative mx-auto w-full max-w-6xl space-y-6 sm:space-y-8">
      <div className="pointer-events-none absolute -left-12 -top-6 hidden sm:block">
        <div className="md-cookie md-cookie-2 animate-float bg-md-primary/10" />
      </div>
      <div className="pointer-events-none absolute -right-16 bottom-40 hidden sm:block">
        <div className="md-cookie md-cookie-3 animate-pulse-glow bg-[#E8B4CB]/8" />
      </div>
      <header className="animate-fade-in space-y-2 text-center">
        <p className="md-label-medium uppercase tracking-[0.3em] text-[#E8B4CB]">
          Task management
        </p>
        <h1 className="md-headline-medium text-xl leading-tight sm:text-2xl md:text-3xl">
          <span className="gradient-text">Every assignment organized</span>{' '}
          <span className="text-md-on-surface">by course.</span>
        </h1>
      </header>
      <TaskManagement />
    </div>
  );
}

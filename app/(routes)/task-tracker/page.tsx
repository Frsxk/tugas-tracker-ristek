import type { Metadata } from 'next';
import { TaskTracker } from "@/components/sections/task-tracker";

export const metadata: Metadata = {
  title: 'Task Tracker | Tugas Tracker',
  description: 'Visualize your task progress with a Kanban board. Drag and update statuses at a glance.',
};

export default function TaskTrackerPage() {
  return (
    <div className="relative mx-auto w-full max-w-6xl space-y-6 sm:space-y-8">
      <div className="pointer-events-none absolute -right-14 -top-6 hidden sm:block">
        <div className="md-cookie md-cookie-3 animate-pulse-glow bg-md-primary/10" />
      </div>
      <div className="pointer-events-none absolute -left-10 bottom-24 hidden sm:block">
        <div className="md-cookie md-cookie-1 animate-float bg-[#E8B4CB]/8" />
      </div>
      <header className="animate-fade-in space-y-2 text-center">
        <p className="md-label-medium uppercase tracking-[0.3em] text-md-primary">
          Task tracker
        </p>
        <h1 className="md-headline-medium text-xl leading-tight sm:text-2xl md:text-3xl">
          <span className="gradient-text">Visual status lanes</span>{' '}
          <span className="text-md-on-surface">for every assignment.</span>
        </h1>
      </header>
      <TaskTracker />
    </div>
  );
}

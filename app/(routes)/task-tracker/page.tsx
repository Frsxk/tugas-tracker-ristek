import { TaskTracker } from "@/components/sections/task-tracker";

export default function TaskTrackerPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4">
      <header className="space-y-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400">
          Task tracker
        </p>
        <h1 className="text-4xl font-semibold text-zinc-900 dark:text-white">
          Visual status lanes for every assignment.
        </h1>
      </header>
      <TaskTracker />
    </div>
  );
}

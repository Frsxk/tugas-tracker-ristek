import { TaskManagement } from "@/components/sections/task-management";

export default function TaskManagementPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4">
      <header className="space-y-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400">
          Task management
        </p>
        <h1 className="text-4xl font-semibold text-zinc-900 dark:text-white">
          Every assignment organized by course.
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-300">
          Preview how tasks look, edit, and delete in this demo state.
        </p>
      </header>
      <TaskManagement />
    </div>
  );
}

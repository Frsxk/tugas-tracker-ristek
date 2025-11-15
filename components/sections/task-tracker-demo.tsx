const trackerTasks = [
  {
    id: "T-300",
    title: "Quiz prep set",
    course: "Applied Statistics",
    status: "Not Started",
    due: "Mar 20",
  },
  {
    id: "T-322",
    title: "Algorithm worksheet",
    course: "Intro to Algorithms",
    status: "In Progress",
    due: "Mar 11",
  },
  {
    id: "T-341",
    title: "History documentary notes",
    course: "Modern Indonesian History",
    status: "In Progress",
    due: "Mar 9",
  },
  {
    id: "T-344",
    title: "Lab report 2",
    course: "Applied Statistics",
    status: "Completed",
    due: "Mar 5",
  },
];

const columns = [
  { key: "Not Started", color: "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950" },
  { key: "In Progress", color: "border-blue-200/70 bg-blue-50/60 dark:border-blue-500/30 dark:bg-blue-500/5" },
  { key: "Completed", color: "border-emerald-200/70 bg-emerald-50/60 dark:border-emerald-500/30 dark:bg-emerald-500/5" },
];

export function TaskTrackerDemo() {
  return (
    <section className="space-y-6">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400">
          Status tracker
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-white">
          All your tasks in a visual workflow
        </h2>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {columns.map((column) => (
          <div
            key={column.key}
            className={`rounded-3xl border p-4 shadow-inner ${column.color}`}
          >
            <div className="flex items-center justify-between text-sm font-semibold text-zinc-600 dark:text-zinc-200">
              <span>{column.key}</span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                {trackerTasks.filter((task) => task.status === column.key).length} items
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {trackerTasks
                .filter((task) => task.status === column.key)
                .map((task) => (
                  <article
                    key={task.id}
                    className="rounded-2xl border border-white/0 bg-white/80 px-4 py-3 text-sm shadow-sm ring-1 ring-black/5 backdrop-blur dark:bg-zinc-900/70"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
                      {task.id}
                    </p>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                      {task.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{task.course}</p>
                    <div className="mt-2 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                      <span>Due {task.due}</span>
                      <button
                        type="button"
                        className="rounded-full px-3 py-1 font-semibold text-blue-600 opacity-60 dark:text-blue-300"
                        disabled
                      >
                        Update status
                      </button>
                    </div>
                  </article>
                ))}
              {trackerTasks.filter((task) => task.status === column.key).length === 0 && (
                <div className="rounded-2xl border border-dashed border-zinc-300 p-4 text-center text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                  No tasks yet
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

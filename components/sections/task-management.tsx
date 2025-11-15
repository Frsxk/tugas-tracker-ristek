const sampleTasks = [
  {
    id: "T-101",
    title: "Assignment 2 - Sorting",
    course: "Intro to Algorithms",
    due: "Mar 12",
    priority: "High",
    status: "Not Started",
  },
  {
    id: "T-132",
    title: "Statistics lab report",
    course: "Applied Statistics",
    due: "Mar 15",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: "T-204",
    title: "Reading reflection",
    course: "Modern Indonesian History",
    due: "Mar 8",
    priority: "Low",
    status: "Completed",
  },
];

const priorityMap: Record<string, string> = {
  High: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300",
  Medium: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300",
  Low: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300",
};

const statusColors: Record<string, string> = {
  "Not Started": "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
  "In Progress": "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300",
  Completed: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300",
};

export function TaskManagement() {
  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <header className="flex flex-col gap-2 border-b border-dashed border-zinc-200 pb-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600 dark:text-amber-400">
              Task ledger
            </p>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              All your tasks at a glance
            </h2>
          </div>
        </header>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                <th className="pb-3">Task</th>
                <th className="pb-3">Course</th>
                <th className="pb-3">Due</th>
                <th className="pb-3">Priority</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {sampleTasks.map((task) => (
                <tr key={task.id} className="text-sm text-zinc-700 dark:text-zinc-200">
                  <td className="py-3 font-medium text-zinc-900 dark:text-white">
                    {task.title}
                  </td>
                  <td className="py-3">{task.course}</td>
                  <td className="py-3">{task.due}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityMap[task.priority]}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[task.status]}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2 text-xs font-semibold">
                      <button className="rounded-full border border-zinc-300 px-3 py-1 text-zinc-600 opacity-60 dark:border-zinc-700 dark:text-zinc-300" >
                        Edit
                      </button>
                      <button className="rounded-full border border-rose-200 px-3 py-1 text-rose-500 opacity-60 dark:border-rose-500/40" >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-6 dark:border-zinc-700 dark:bg-zinc-900/70">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Create a task</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Fill in the details below to add a new task to your ledger.
        </p>
        <form className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Task name
            <input
              type="text"
              placeholder="Group presentation"
              className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              
            />
          </label>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Linked course
            <select
              className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              
            >
              <option>Intro to Algorithms</option>
              <option>Applied Statistics</option>
            </select>
          </label>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Due date
            <input
              type="date"
              className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              
            />
          </label>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Priority
            <select
              className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </label>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200 sm:col-span-2">
            Description
            <textarea
              rows={3}
              placeholder="Outline requirements, attach resources, etc."
              className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              
            />
          </label>
          <div className="sm:col-span-2">
            <div className="flex justify-center">
              <button
                type="button"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-gray-300 transition"
              >
                Create task
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

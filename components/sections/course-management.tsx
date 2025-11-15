const sampleCourses = [
  {
    code: "CS101",
    name: "Intro to Algorithms",
    lecturer: "Dr. Arifin",
    schedule: "Mon & Wed • 09:00 - 10:30",
    credits: 3,
    status: "Active",
  },
  {
    code: "STAT202",
    name: "Applied Statistics",
    lecturer: "Ms. Larasati",
    schedule: "Tue • 13:00 - 15:30",
    credits: 4,
    status: "Active",
  },
  {
    code: "HIST110",
    name: "Modern Indonesian History",
    lecturer: "Mr. Nugroho",
    schedule: "Fri • 08:00 - 10:00",
    credits: 2,
    status: "Completed",
  },
];

const summary = [
  { label: "Total courses", value: sampleCourses.length },
  { label: "Active", value: sampleCourses.filter((c) => c.status === "Active").length },
  { label: "Completed", value: sampleCourses.filter((c) => c.status === "Completed").length },
];

export function CourseManagement() {
  return (
    <section className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-3">
        {summary.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-zinc-200 bg-white p-5 text-center dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
              {item.label}
            </p>
            <p className="mt-3 text-3xl font-semibold text-zinc-900 dark:text-white">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <header className="flex flex-col gap-2 border-b border-dashed border-zinc-200 pb-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
              Course roster
            </p>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">All your courses</h2>
          </div>
        </header>

        <div className="mt-6 space-y-4">
          {sampleCourses.map((course) => (
            <article
              key={course.code}
              className="flex flex-col gap-4 rounded-2xl border border-zinc-200 px-5 py-4 transition hover:border-blue-200 dark:border-zinc-700 dark:hover:border-blue-500/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                  {course.code}
                </p>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{course.name}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  {course.lecturer} • {course.schedule}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                  {course.credits} credits
                </span>
                <span
                  className={`rounded-full px-3 py-1 font-semibold ${
                    course.status === "Completed"
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300"
                      : "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300"
                  }`}
                >
                  {course.status}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-6 dark:border-zinc-700 dark:bg-zinc-900/70">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Add a new course</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Fill in the details below to create a new course entry.
        </p>
        <form className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Course name
            <input
              type="text"
              placeholder="Human-Computer Interaction"
              className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </label>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Lecturer
            <input
              type="text"
              placeholder="Dr. Dewi"
              className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </label>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Meeting schedule
            <input
              type="text"
              placeholder="Thu • 10:00 - 12:00"
              className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </label>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Credits (SKS)
            <input
              type="number"
              min={1}
              max={6}
              placeholder="3"
              className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </label>
          <div className="sm:col-span-2">
            <div className="flex justify-center">
              <button
                type="button"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-gray-300 transition"
              >
                Add course
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

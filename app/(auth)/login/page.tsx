export default function LoginPage() {
  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-zinc-200 bg-white px-8 py-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
          Welcome back
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-white">
          Log in to Tugas Tracker
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Ready to access your tasks? Log in below.
        </p>
      </div>

      <form className="mt-8 space-y-6">
        <div>
          <label htmlFor="username" className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="yourusername"
            className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950"
          />
        </div>
        <button
          type="button"
          className="w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-gray-300"
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-300">
        <p>
          Don&apos;t have an account yet?{" "}
          <a
            href="/register"
            className="font-semibold text-blue-600 transition hover:text-blue-400"
          >
            Register now
          </a>
        </p>
      </div>
    </div>
  );
}

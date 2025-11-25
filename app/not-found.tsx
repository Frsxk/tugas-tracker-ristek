import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h2 className="text-4xl font-bold text-zinc-900 dark:text-white">404</h2>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Page not found
      </p>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Go back home
      </Link>
    </div>
  );
}

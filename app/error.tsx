'use client';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-md-error-container">
        <span className="material-symbols-outlined text-[32px] text-md-error">error</span>
      </div>
      <div>
        <h2 className="md-headline-small text-md-on-surface">Something went wrong</h2>
        <p className="md-body-medium mt-2 max-w-md text-md-on-surface-variant">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
      </div>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 rounded-full bg-md-primary px-6 py-2.5 text-sm font-semibold text-md-on-primary shadow-md shadow-md-primary/20 transition hover:brightness-110"
      >
        <span className="material-symbols-outlined text-[18px]">refresh</span>
        Try again
      </button>
    </div>
  );
}

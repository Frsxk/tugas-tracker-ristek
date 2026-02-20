import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-md-tertiary-container">
        <span className="material-symbols-outlined text-[32px] text-md-on-tertiary-container">
          explore_off
        </span>
      </div>
      <div>
        <h1 className="md-headline-large text-md-on-surface">404</h1>
        <p className="md-body-large mt-2 text-md-on-surface-variant">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-md-primary px-6 py-2.5 text-sm font-semibold text-md-on-primary shadow-md shadow-md-primary/20 transition hover:brightness-110"
      >
        <span className="material-symbols-outlined text-[18px]">home</span>
        Back to home
      </Link>
    </div>
  );
}

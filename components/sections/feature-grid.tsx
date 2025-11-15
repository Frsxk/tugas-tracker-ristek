import Link from "next/link";

export interface FeatureInfo {
  title: string;
  description: string;
  href: string;
}

interface FeatureGridProps {
  features: FeatureInfo[];
}

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <section className="mt-16 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
            All Features
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Explore all features in action
          </h2>
        </div>
        <Link
          href="/task-tracker"
          className="text-sm font-semibold text-blue-600 transition hover:text-blue-500 dark:text-blue-400"
        >
          Jump to tracker →
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3 justify-items-center justify-center items-center">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div>
              <h3 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                {feature.description}
              </p>
            </div>
            <Link
              href={feature.href}
              className="mt-6 inline-flex items-center text-sm font-semibold text-zinc-900 transition hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-300"
            >
              Learn more
              <span aria-hidden className="ml-1">→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

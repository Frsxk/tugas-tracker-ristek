import Link from "next/link";

export interface FeatureInfo {
  title: string;
  description: string;
  href: string;
  icon?: string;
}

interface FeatureGridProps {
  features: FeatureInfo[];
}

const badgeColors = [
  'bg-md-primary-container text-md-on-primary-container',
  'bg-md-secondary-container text-md-on-secondary-container',
  'bg-md-tertiary-container text-md-on-tertiary-container',
];

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <section className="relative mt-16 space-y-8">
      {/* Decorative cookies behind grid */}
      <div className="pointer-events-none absolute -left-20 top-1/3">
        <div className="md-cookie md-cookie-2 animate-pulse-glow bg-md-primary-container/12" />
      </div>
      <div className="pointer-events-none absolute -right-16 bottom-20">
        <div className="md-cookie md-cookie-3 animate-float bg-[#E8B4CB]/10" />
      </div>

      <div className="relative flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="md-label-medium uppercase tracking-[0.3em] text-[#E8B4CB]">
            All Features
          </p>
          <h2 className="md-headline-small mt-2 text-md-on-surface">
            Explore all features in action
          </h2>
        </div>
        <Link
          href="/task-tracker"
          className="inline-flex items-center gap-1 text-sm font-semibold text-md-primary transition-colors duration-200 hover:text-[#E8B4CB]"
        >
          Jump to tracker
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>

      <hr className="md-divider-gradient" />

      <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <Link
            key={feature.title}
            href={feature.href}
            className={`animate-fade-in group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-md-outline-variant/15 bg-md-surface-container p-6 shadow-md shadow-black/10 transition-all duration-300 hover:border-md-primary/20 hover:bg-md-surface-container-high hover:shadow-xl hover:shadow-black/20 delay-${i + 1}`}
          >
            {/* Subtle corner glow on hover */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-md-primary/0 transition-all duration-500 group-hover:bg-md-primary/10 group-hover:blur-2xl" />

            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${badgeColors[i % badgeColors.length]}`}>
              <span className="material-symbols-outlined text-[24px]">
                {feature.icon ?? 'widgets'}
              </span>
            </div>

            <div>
              <h3 className="md-title-large text-md-on-surface transition-colors group-hover:text-md-primary">
                {feature.title}
              </h3>
              <p className="md-body-medium mt-2 text-md-on-surface-variant">
                {feature.description}
              </p>
            </div>

            <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-md-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              Learn more
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

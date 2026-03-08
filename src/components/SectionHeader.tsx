import { cn } from "./ui/utils";

/**
 * SectionHeader — Swiss editorial section heading.
 *
 * Layout:
 *   [3/12] label + decorative line
 *   [9/12] border-t-2 border-secondary | main title + description
 */
interface SectionHeaderProps {
  /** Small label on the left (e.g. "Scope of services") */
  label: string;
  /** Main serif title */
  title: string;
  /** Optional subtitle on the right */
  description?: string;
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn("grid grid-cols-1 lg:grid-cols-12 gap-0 mb-16", className)}
    >
      {/* Ліва колонка — мітка + декоративна риска */}
      <div className="lg:col-span-3 flex flex-col justify-end mb-6 lg:mb-0">
        <span className="text-[10px] uppercase tracking-[0.45em] text-secondary block mb-3">
          {label.replace(/^—\s*/, "")}
        </span>
        <div className="w-8 h-0.5 bg-secondary" />
      </div>

      {/* Right column — title + description. Long line only on desktop */}
      <div className="lg:col-span-9">
        <div
          className="hidden lg:block border-t-2 border-secondary w-full mb-6"
          aria-hidden="true"
        />
        <div
          className={cn(
            "flex flex-col gap-4",
            description && "md:flex-row md:items-end md:justify-between"
          )}
        >
          <h2 className="font-serif text-primary leading-[0.9] tracking-tight section-header-title">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-primary/55 max-w-sm font-light leading-relaxed md:text-right">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

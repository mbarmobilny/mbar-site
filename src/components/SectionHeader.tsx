import { cn } from "./ui/utils";

/**
 * SectionHeader — Swiss editorial заголовок секції.
 *
 * Розкладка:
 *   [3/12] мітка + бежева риска
 *   [9/12] border-t-2 border-secondary | великий заголовок + опис
 */
interface SectionHeaderProps {
  /** Мала підпис зліва (наприклад "Scope of services") */
  label: string;
  /** Великий serif-заголовок */
  title: string;
  /** Необов'язковий підзаголовок праворуч */
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

      {/* Права колонка — заголовок + опис. Довга лінія тільки на десктопі */}
      <div className="lg:col-span-9">
        <div
          className="hidden lg:block border-t-2 border-secondary w-full mb-6"
          aria-hidden="true"
        />
        <div
          className={cn(
            "flex flex-col gap-4",
            description && "md:flex-row md:items-end md:justify-between",
          )}
        >
          <h2
            className="font-serif text-primary leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
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

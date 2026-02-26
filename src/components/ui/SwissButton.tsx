import { ArrowRight } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "./utils";

/**
 * SwissButton — фірмова кнопка з wipe-анімацією знизу вгору.
 *
 * variant:
 *   "primary"   — обведення border-primary, заливка bg-primary (використовується скрізь)
 *   "secondary" — dim обведення, та сама заливка (другорядні дії)
 *   "inverse"   — вже заповнена bg-primary, overlay bg-white/10 при hover (форма)
 *
 * justify:
 *   "center"  — текст і стрілка по центру (CTA, форма)
 *   "between" — текст зліва, стрілка справа (Hero)
 */

type Variant = "primary" | "secondary" | "inverse";

const variantMap: Record<Variant, { wrapper: string; fill: string }> = {
  primary: {
    wrapper: "border border-primary text-primary hover:text-[#faf9f7]",
    fill: "bg-primary",
  },
  secondary: {
    wrapper: "border border-primary/30 text-primary/60 hover:text-[#faf9f7]",
    fill: "bg-primary",
  },
  inverse: {
    wrapper: "bg-primary text-[#faf9f7]",
    fill: "bg-white/10",
  },
};

interface SwissButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: Variant;
  justify?: "center" | "between";
  fullWidth?: boolean;
  showSeparator?: boolean;
  className?: string;
  disabled?: boolean;
}

export function SwissButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  justify = "center",
  fullWidth = false,
  showSeparator = true,
  className,
  disabled = false,
}: SwissButtonProps) {
  const { wrapper, fill } = variantMap[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        // базові стилі
        "group relative overflow-hidden",
        "px-8 py-4 text-xs uppercase tracking-[0.25em]",
        "flex items-center gap-4",
        "transition-colors duration-500",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        // justify
        justify === "between" ? "justify-between" : "justify-center",
        // ширина
        fullWidth && "w-full",
        // варіант
        wrapper,
        // зовнішні overrides через cn / tailwind-merge
        className,
      )}
    >
      {/* Заливка-wipe */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 translate-y-full",
          "group-hover:translate-y-0 transition-transform duration-500 ease-in-out",
          fill,
        )}
      />

      {/* Текст */}
      <span className="relative z-10 whitespace-nowrap">{children}</span>

      {/* Роздільник + стрілка */}
      <span className="relative z-10 flex items-center gap-3 shrink-0">
        {showSeparator && (
          <span className="w-px h-4 bg-current opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
        )}
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
      </span>
    </button>
  );
}

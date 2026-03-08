import { ArrowRight } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "./utils";

/**
 * SwissButton — branded button with wipe animation from bottom to top.
 *
 * variant:
 *   "primary"   — border-primary outline, bg-primary fill (used everywhere)
 *   "secondary" — dim outline, same fill (secondary actions)
 *   "inverse"   — pre-filled bg-primary, overlay bg-white/10 on hover (forms)
 *
 * justify:
 *   "center"  — text and arrow centered (CTA, form)
 *   "between" — text left, arrow right (Hero)
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
        // base styles
        "group relative overflow-hidden",
        "px-8 py-4 text-xs uppercase tracking-[0.25em]",
        "flex items-center gap-4",
        "transition-colors duration-500",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        // justify
        justify === "between" ? "justify-between" : "justify-center",
        // width
        fullWidth && "w-full",
        // variant
        wrapper,
        // external overrides via cn / tailwind-merge
        className
      )}
    >
      {/* Fill wipe */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 translate-y-full",
          "group-hover:translate-y-0 transition-transform duration-500 ease-in-out",
          fill
        )}
      />

      {/* Текст */}
      <span className="relative z-10 whitespace-nowrap">{children}</span>

      {/* Separator + arrow */}
      <span className="relative z-10 flex items-center gap-3 shrink-0">
        {showSeparator && (
          <span className="w-px h-4 bg-current opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
        )}
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
      </span>
    </button>
  );
}

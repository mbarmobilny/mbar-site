import { type ReactNode } from "react";
import { cn } from "./ui/utils";

/**
 * Container — стандартна обгортка макету mBar.
 * Обмежує ширину до 1920px та додає responsive відступи.
 */
interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn("max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12", className)}
    >
      {children}
    </div>
  );
}

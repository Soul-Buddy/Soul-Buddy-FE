import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/lib/cn";

type CardSurface = "default" | "muted" | "primary" | "danger" | "dark";
type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  surface?: CardSurface;
  padding?: CardPadding;
  shadow?: boolean;
}

const surfaceClass: Record<CardSurface, string> = {
  default: "bg-[var(--color-surface)] text-[var(--color-text)]",
  muted: "bg-[var(--color-surface-strong)] text-[var(--color-text)]",
  primary: "bg-[var(--color-primary-soft)] text-[var(--color-text)]",
  danger: "bg-[var(--color-danger)] text-white",
  dark: "bg-[var(--color-dark)] text-white",
};

const paddingClass: Record<CardPadding, string> = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-5",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { className, surface = "default", padding = "md", shadow = false, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--radius-lg)]",
          surfaceClass[surface],
          paddingClass[padding],
          shadow && "shadow-[var(--shadow-card)]",
          className,
        )}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

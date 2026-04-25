import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/lib/cn";

type ButtonVariant = "primary" | "secondary" | "dark" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-strong)] active:bg-[var(--color-primary-strong)] disabled:bg-[var(--color-primary-soft)] disabled:text-white/70",
  secondary:
    "bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface)] disabled:opacity-50",
  dark: "bg-[var(--color-dark)] text-white hover:bg-[var(--color-dark-soft)] disabled:opacity-60",
  ghost:
    "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface)] disabled:opacity-50",
  danger:
    "bg-[var(--color-danger)] text-white hover:opacity-90 disabled:opacity-50",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-[15px]",
  lg: "h-14 px-6 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "lg",
      fullWidth = false,
      type = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] font-semibold transition-colors disabled:cursor-not-allowed",
          variantClass[variant],
          sizeClass[size],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

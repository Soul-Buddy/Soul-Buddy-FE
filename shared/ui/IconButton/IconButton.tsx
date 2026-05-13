import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/lib/cn";

type IconButtonVariant = "plain" | "primary" | "surface" | "danger" | "dark";
type IconButtonSize = "sm" | "md" | "lg";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  "aria-label": string;
}

const variantClass: Record<IconButtonVariant, string> = {
  plain: "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface)]",
  primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-strong)]",
  surface: "bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-strong)]",
  danger: "bg-[var(--color-danger-soft)] text-[var(--color-danger)] hover:bg-[var(--color-danger)] hover:text-white",
  dark: "bg-[var(--color-dark)] text-white hover:bg-[var(--color-dark-soft)]",
};

const sizeClass: Record<IconButtonSize, string> = {
  sm: "h-9 w-9 [&>svg]:h-4 [&>svg]:w-4",
  md: "h-11 w-11 [&>svg]:h-5 [&>svg]:w-5",
  lg: "h-12 w-12 [&>svg]:h-6 [&>svg]:w-6",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = "plain", size = "md", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50",
          variantClass[variant],
          sizeClass[size],
          className,
        )}
        {...props}
      />
    );
  },
);
IconButton.displayName = "IconButton";

"use client";

import { type InputHTMLAttributes, forwardRef, useId } from "react";
import { Check } from "lucide-react";
import { cn } from "@/shared/lib/cn";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, checked, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "inline-flex cursor-pointer items-center gap-3 text-[14px] text-[var(--color-text)] select-none",
          className,
        )}
      >
        <span className="relative inline-flex h-6 w-6 items-center justify-center">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            checked={checked}
            className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
            {...props}
          />
          <span
            className={cn(
              "pointer-events-none absolute inset-0 rounded-md border transition-colors",
              checked
                ? "border-[var(--color-primary)] bg-[var(--color-primary)]"
                : "border-[var(--color-border-strong)] bg-white",
            )}
          />
          {checked && (
            <Check className="pointer-events-none relative h-4 w-4 text-white" strokeWidth={3} />
          )}
        </span>
        {label && <span>{label}</span>}
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";

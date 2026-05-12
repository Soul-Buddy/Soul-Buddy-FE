"use client";

import { type InputHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/shared/lib/cn";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  maxLength?: number;
  showCounter?: boolean;
  error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      label,
      maxLength,
      showCounter = true,
      error,
      value,
      defaultValue,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const length = String(value ?? defaultValue ?? "").length;
    const showCount = showCounter && typeof maxLength === "number";

    return (
      <div className="flex w-full flex-col gap-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[15px] font-medium text-[var(--color-text)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            value={value}
            defaultValue={defaultValue}
            maxLength={maxLength}
            className={cn(
              "h-14 w-full rounded-[var(--radius-md)] border bg-white px-4 text-[15px] text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none",
              error
                ? "border-[var(--color-danger)] focus:border-[var(--color-danger)]"
                : "border-[var(--color-border)] focus:border-[var(--color-primary)]",
              showCount && "pr-16",
              className,
            )}
            {...props}
          />
          {showCount && (
            <span className="absolute top-1/2 right-4 -translate-y-1/2 text-xs text-[var(--color-text-subtle)]">
              {length} / {maxLength}
            </span>
          )}
        </div>
        {error && (
          <p className="text-xs text-[var(--color-danger)]">{error}</p>
        )}
      </div>
    );
  },
);
TextField.displayName = "TextField";

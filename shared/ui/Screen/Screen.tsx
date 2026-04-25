import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type ScreenTone = "light" | "dark";

interface ScreenProps extends HTMLAttributes<HTMLDivElement> {
  header?: ReactNode;
  footer?: ReactNode;
  tone?: ScreenTone;
  noPadding?: boolean;
}

const toneClass: Record<ScreenTone, string> = {
  light: "bg-[var(--color-bg)] text-[var(--color-text)]",
  dark: "bg-[var(--color-dark)] text-white",
};

export function Screen({
  className,
  header,
  footer,
  tone = "light",
  noPadding = false,
  children,
  ...props
}: ScreenProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen w-full flex-col",
        toneClass[tone],
        className,
      )}
      {...props}
    >
      {header}
      <div className={cn("flex-1 overflow-y-auto", !noPadding && "px-5 pb-6")}>
        {children}
      </div>
      {footer && (
        <div className={cn("sticky bottom-0 px-5 pt-3 pb-5", tone === "dark" ? "bg-[var(--color-dark)]" : "bg-[var(--color-bg)]")}>
          {footer}
        </div>
      )}
    </div>
  );
}

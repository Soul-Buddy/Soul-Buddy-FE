import { type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

interface AppHeaderProps {
  leading?: ReactNode;
  trailing?: ReactNode;
  showStatusBar?: boolean;
  statusBarTone?: "light" | "dark";
  time?: string;
  className?: string;
}

export function AppHeader({
  leading,
  trailing,
  showStatusBar = true,
  statusBarTone = "light",
  time = "9:41",
  className,
}: AppHeaderProps) {
  const statusTextColor = statusBarTone === "dark" ? "text-white/80" : "text-[var(--color-text-muted)]";

  return (
    <div className={cn("w-full", className)}>
      {showStatusBar && (
        <div className={cn("flex items-center justify-between px-5 pt-3 pb-2 text-xs", statusTextColor)}>
          <span>{time}</span>
          <span className="flex items-center gap-2">
            <span aria-hidden>···</span>
            <span>100%</span>
          </span>
        </div>
      )}
      {(leading || trailing) && (
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center">{leading}</div>
          <div className="flex items-center gap-1">{trailing}</div>
        </div>
      )}
    </div>
  );
}

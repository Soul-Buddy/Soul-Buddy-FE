import { type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

interface TopBarProps {
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}

export function TopBar({ leading, trailing, className }: TopBarProps) {
  if (!leading && !trailing) return null;

  return (
    <div className={cn("flex items-center justify-between px-2 py-2", className)}>
      <div className="flex items-center">{leading}</div>
      <div className="flex items-center gap-1">{trailing}</div>
    </div>
  );
}

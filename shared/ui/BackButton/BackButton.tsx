"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { IconButton } from "@/shared/ui/IconButton";
import { cn } from "@/shared/lib/cn";

interface BackButtonProps {
  onClick?: () => void;
  fallbackHref?: string;
  ariaLabel?: string;
  tone?: "light" | "dark";
}

export function BackButton({
  onClick,
  fallbackHref = "/",
  ariaLabel = "이전으로",
  tone = "light",
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) return onClick();
    if (window.history.length > 1) router.back();
    else router.push(fallbackHref);
  };

  return (
    <IconButton
      variant="plain"
      size="md"
      aria-label={ariaLabel}
      onClick={handleClick}
      className={cn(tone === "dark" && "text-white hover:bg-white/10")}
    >
      <ChevronLeft />
    </IconButton>
  );
}

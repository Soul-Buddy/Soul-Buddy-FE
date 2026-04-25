"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { IconButton } from "@/shared/ui/IconButton";

interface BackButtonProps {
  onClick?: () => void;
  fallbackHref?: string;
  ariaLabel?: string;
}

export function BackButton({ onClick, fallbackHref = "/", ariaLabel = "이전으로" }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) return onClick();
    if (window.history.length > 1) router.back();
    else router.push(fallbackHref);
  };

  return (
    <IconButton variant="plain" size="md" aria-label={ariaLabel} onClick={handleClick}>
      <ChevronLeft />
    </IconButton>
  );
}

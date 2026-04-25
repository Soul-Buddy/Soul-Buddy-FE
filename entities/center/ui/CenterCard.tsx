"use client";

import { MapPin, Phone } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { IconButton } from "@/shared/ui/IconButton";
import { Tag } from "@/shared/ui/Tag";
import type { CounselCenter } from "../model/types";

interface CenterCardProps {
  center: CounselCenter;
  onCall?: () => void;
}

function formatDistance(meters: number): string {
  return meters < 1000 ? `${meters}m` : `${(meters / 1000).toFixed(1)}km`;
}

export function CenterCard({ center, onCall }: CenterCardProps) {
  return (
    <Card surface="default" padding="md" shadow className="w-full">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-surface-strong)] text-[var(--color-text-muted)]">
          <MapPin className="h-5 w-5" />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <span className="text-[15px] font-semibold text-[var(--color-text)]">{center.name}</span>
          <span className="text-xs text-[var(--color-text-muted)]">
            {center.address} · {formatDistance(center.distanceM)}
          </span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {center.tags.map((tag) => (
              <Tag key={tag} tone="muted">
                {tag}
              </Tag>
            ))}
            <Tag tone="primary">{center.hours}</Tag>
          </div>
        </div>
        <IconButton variant="primary" size="md" aria-label={`${center.name}에 전화`} onClick={onCall}>
          <Phone />
        </IconButton>
      </div>
    </Card>
  );
}

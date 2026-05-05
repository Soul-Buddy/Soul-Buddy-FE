"use client";

import { EMOTIONS, EmotionCell, type EmotionId } from "@/entities/emotion";

interface EmotionGridProps {
  selectedId: EmotionId | null;
  onSelect: (id: EmotionId) => void;
}

export function EmotionGrid({ selectedId, onSelect }: EmotionGridProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {EMOTIONS.map((emotion) => (
        <EmotionCell
          key={emotion.id}
          emotion={emotion}
          selected={selectedId === emotion.id}
          onClick={() => onSelect(emotion.id)}
        />
      ))}
    </div>
  );
}

"use client";

import { BUDDIES, BuddyCard, findBuddy, type BuddyId } from "@/entities/buddy";
import { Card } from "@/shared/ui/Card";

interface BuddyPickerProps {
  selectedId: BuddyId | null;
  onSelect: (id: BuddyId) => void;
}

export function BuddyPicker({ selectedId, onSelect }: BuddyPickerProps) {
  const selected = selectedId ? findBuddy(selectedId) : null;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        {BUDDIES.map((buddy) => (
          <BuddyCard
            key={buddy.id}
            buddy={buddy}
            tone="dark"
            selected={selectedId === buddy.id}
            onClick={() => onSelect(buddy.id)}
          />
        ))}
      </div>

      {selected && (
        <Card surface="dark" padding="md" className="border border-white/10">
          <p className="text-sm leading-relaxed text-white/80">
            {selected.description}
          </p>
        </Card>
      )}
    </div>
  );
}

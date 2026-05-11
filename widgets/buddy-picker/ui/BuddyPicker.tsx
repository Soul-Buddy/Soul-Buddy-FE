"use client";

import { BUDDIES, BuddyCard, findBuddy, type BuddyId } from "@/entities/buddy";
import { Card } from "@/shared/ui/Card";

/**
 * 버디 선택 Props 인터페이스
 * - selectedId: 현재 선택된 버디의 ID, 선택된 버디가 없으면 null
 * - onSelect: 버디가 선택될 때 호출되는 콜백 함수, 선택된 버디의 ID를 인자로 받음
 */
interface BuddyPickerProps {
  selectedId: BuddyId | null;
  onSelect: (id: BuddyId) => void;
}

/**
 * 버디 선택 컴포넌트 - 사용자가 대화를 나눌 버디를 선택할 수 있는 UI 요소
 * @param param0 
 * @returns 
 */
export function BuddyPicker({ selectedId, onSelect }: BuddyPickerProps) {
  const selected = selectedId ? findBuddy(selectedId) : null; // 선택된 버디 정보 가져오기

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        {/* 버디 카드 목록 */}
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
        <Card surface="dark" padding="md" className="border border-white/10 mt-3">
          <p className="text-sm leading-relaxed text-white/80">
            {selected.description}
          </p>
        </Card>
      )}
    </div>
  );
}

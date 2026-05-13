"use client";

import { EMOTIONS, EmotionCell, type EmotionId } from "@/entities/emotion";

/**
 * 감정 그리드 Props 인터페이스
 * - selectedId: 현재 선택된 감정의 ID, 선택된 감정이 없으면 null
 * - onSelect: 감정이 선택될 때 호출되는 콜백 함수, 선택된 감정의 ID를 인자로 받음
 */
interface EmotionGridProps {
  selectedId: EmotionId | null;
  onSelect: (id: EmotionId) => void;
}

/**
 * 감정 그리드 컴포넌트 - 사용자가 자신의 감정 상태에 가장 가까운 감정을 선택할 수 있는 UI 요소
 * @param param0 
 * @returns 
 */
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

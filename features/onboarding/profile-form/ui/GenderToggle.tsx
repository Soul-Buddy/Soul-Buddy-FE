"use client";

import { cn } from "@/shared/lib/cn";
import type { Gender } from "@/entities/user";

/**
 * 성별 토글 컴포넌트 Props
 * - `value`: 현재 선택된 성
 * `onChange`: 성별이 변경될 때 호출되는 함수
 */
interface GenderToggleProps {
  value: Gender | null;
  onChange: (value: Gender) => void;
}

/**
 * 성별 토글 컴포넌트
 * @param param0 // 선택된 성별 값과 변경 핸들러를 받아서 성별 선택 버튼을 렌더링
 * @returns
 * @example
 */
const OPTIONS: { id: Gender; label: string }[] = [
  { id: "female", label: "여성" },
  { id: "male", label: "남성" },
];

/**
 * 성별 토글 컴포넌트
 * @param param0 // 선택된 성별 값과 변경 핸들러를 받아서 성별 선택 버튼을 렌더링
 * @returns
 * @example
 * const [gender, setGender] = useState
 */
export function GenderToggle({ value, onChange }: GenderToggleProps) {
  return (
    // 버튼 그룹 컨테이너로, 각 성별 옵션에 대해 버튼을 렌더링
    <div className="flex gap-3">
      {OPTIONS.map((opt) => {
        const selected = value === opt.id; // 현재 옵션이 선택된 성별과 일치하는지 여부를 나타내는 변수
        return (
          // 각 성별 옵션에 대한 버튼으로, 클릭 시 onChange 핸들러를 호출하여 선택된 성별을 변경
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)} // 버튼 클릭 시 해당 성별이 선택되도록 onChange 핸들러 호출
            aria-pressed={selected}
            className={cn(
              "h-12 flex-1 rounded-[var(--radius-md)] border text-[15px] font-medium transition-colors",
              selected
                ? "border-transparent bg-[var(--color-primary-soft)] text-[var(--color-primary-strong)]"
                : "border-[var(--color-border)] bg-white text-[var(--color-text-muted)]",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

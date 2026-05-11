import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/lib/cn";

type CardSurface = "default" | "muted" | "primary" | "danger" | "dark"; // 카드 표면 스타일 옵션
type CardPadding = "none" | "sm" | "md" | "lg"; // 카드 패딩 옵션

/**
 * 카드 컴포넌트 Props
 * - `surface`: 카드의 배경과 텍스트 색상 조합을 선택하는 옵션
 * - `padding`: 카드 내부 여백 크기를 조절하는 옵션
 * - `shadow`: 카드에 그림자 효과를 줄지 여부
 * - 기타 HTML div 속성도 함께 받을 수 있음
 */
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  surface?: CardSurface;
  padding?: CardPadding;
  shadow?: boolean;
}

/**
 * 카드컴포넌트 - 다양한 표면 스타일과 패딩 옵션을 제공하는 범용 카드 컴포넌트
 * - `surface` prop으로 카드의 배경과 텍스트 색상 조합을 선택할 수 있음
 * - `padding` prop으로 카드 내부 여백 크기를 조절할 수 있음
 */
const surfaceClass: Record<CardSurface, string> = {
  default: "bg-[var(--color-surface)] text-[var(--color-text)]", // 기본 카드 스타일
  muted: "bg-[var(--color-surface-strong)] text-[var(--color-text)]", // 약간 강조된 카드 스타일
  primary: "bg-[var(--color-primary-soft)] text-[var(--color-text)]", // 배경 : 주요 색상의 연한 버전, 텍스트는 기본 색상
  danger: "bg-[var(--color-danger)] text-white", // 위험 또는 경고를 나타내는 카드 스타일
  dark: "bg-[var(--color-dark)] text-white", // 어두운 배경의 카드 스타일
};

const paddingClass: Record<CardPadding, string> = {
  none: "", // 패딩 없음
  sm: "p-3", // 작은 패딩
  md: "p-4", // 중간 패딩
  lg: "p-5", // 큰 패딩
};

/**
 * 카드 컴포넌트
 * - `surface` prop으로 카드의 배경과 텍스트 색상 조합을 선택할 수 있음
 * - `padding` prop으로 카드 내부 여백 크기를 조절할 수 있음
 * - `shadow` prop으로 카드에 그림자 효과를 줄 수 있음
 * @param param0 
 * @returns 
 * @example
 * <Card surface="primary" padding="lg" shadow>
 *   <p>카드 내용</p>
 * </Card>
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { className, surface = "default", padding = "md", shadow = false, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--radius-lg)]",
          surfaceClass[surface],
          paddingClass[padding],
          shadow && "shadow-[var(--shadow-card)]",
          className,
        )}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type ScreenTone = "light" | "dark"; // 화면의 밝기 모드 옵션

/**
 * 화면 레이아웃 컴포넌트 Props
 * - `header`: 화면 상단에 고정되는 헤더 콘텐츠
 * - `footer`: 화면 하단에 고정되는 푸터 콘텐츠
 * - `tone`: 화면의 밝기 모드 (light/dark)
 * - `noPadding`: 화면 내부 패딩 제거 여부
 * - 기타 HTML div 속성도 함께 받을 수 있음
 */
interface ScreenProps extends HTMLAttributes<HTMLDivElement> {
  header?: ReactNode; // 화면 상단에 고정되는 헤더 콘텐츠
  footer?: ReactNode; // 화면 하단에 고정되는 푸터 콘텐츠
  tone?: ScreenTone; // 화면의 밝기 모드 (light/dark)
  noPadding?: boolean; // 화면 내부 패딩 제거 여부
}

const toneClass: Record<ScreenTone, string> = {
  light: "bg-[var(--color-bg)] text-[var(--color-text)]",
  dark: "bg-[var(--color-dark)] text-white",
};

/**
 * 화면 레이아웃 컴포넌트
 * - `header`와 `footer`를 포함할 수 있는 레이아웃 컴포넌트
 * - `tone` prop으로 전체 화면의 밝기 모드를 설정할 수 있음 (light/dark)
 * - `noPadding` prop으로 화면 내부 패딩을 제거할 수 있음
 * @param param0 
 * @returns
 */
export function Screen({
  className,
  header,
  footer,
  tone = "light",
  noPadding = false,
  children,
  ...props
}: ScreenProps) {
  return (
    // 화면 전체를 감싸는 div로, 헤더와 푸터를 포함한 레이아웃을 구성
    <div
      className={cn(
        "flex min-h-screen w-full flex-col",
        toneClass[tone],
        className,
      )}
      {...props}
    >
      {/* 화면 상단 헤더 */}
      {header}
      {/* 화면 본문 */}
      <div className={cn("flex flex-1 flex-col overflow-y-auto", !noPadding && "px-5 pb-6")}>
        {children}
      </div>
      {/* 화면 하단 푸터 */}
      {footer && (
        <div className={cn("sticky bottom-0 px-5 pt-3 pb-5", tone === "dark" ? "bg-[var(--color-dark)]" : "bg-[var(--color-bg)]")}>
          {footer}
        </div>
      )}
    </div>
  );
}

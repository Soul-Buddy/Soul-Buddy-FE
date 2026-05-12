import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/lib/cn";

type ButtonVariant = "primary" | "secondary" | "dark" | "ghost" | "danger"; // 주요 버튼, 세컨더리 버튼, 다크 버튼, 고스트 버튼, 위험 버튼 등 다양한 스타일 옵션
type ButtonSize = "sm" | "md" | "lg"; // 작은 버튼, 중간 버튼, 큰 버튼 등 다양한 크기 옵션

/**
 * 버튼 컴포넌트 Props
 * - `variant`: 버튼의 스타일을 선택하는 옵션 (primary, secondary, dark, ghost, danger)
 * - `size`: 버튼의 크기를 선택하는 옵션 (sm, md, lg)
 * - `fullWidth`: 버튼이 부모 요소의 전체 너비를 차지하도록 하는 옵션
 * - 기타 HTML button 속성도 함께 받을 수 있음
 * @example
 * <Button variant="primary" size="md" fullWidth onClick={handleClick}>
 *   클릭하세요
 * </Button>
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

/**
 * 버튼 스타일 클래스 매핑
 */
const variantClass: Record<ButtonVariant, string> = {
  primary: // 주요 행동을 유도하는 버튼 스타일
    "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-strong)] active:bg-[var(--color-primary-strong)] disabled:bg-[var(--color-primary-soft)] disabled:text-white/70",
  secondary: // 보조적인 행동을 나타내는 버튼 스타일
    "bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface)] disabled:opacity-50",
  dark: // 다크 스타일의 버튼
    "bg-[var(--color-dark)] text-white hover:bg-[var(--color-dark-soft)] disabled:opacity-60",
  ghost: // 배경이 없는 버튼 스타일
    "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface)] disabled:opacity-50",
  danger: // 위험 또는 경고를 나타내는 버튼 스타일
    "bg-[var(--color-danger)] text-white hover:opacity-90 disabled:opacity-50",
};

/**
 * 버튼 크기 클래스 매핑
 * - `sm`: 작은 버튼 스타일
 * - `md`: 중간 버튼 스타일
 * - `lg`: 큰 버튼 스타일
 */
const sizeClass: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm", // 작은 버튼 스타일
  md: "h-12 px-5 text-[15px]", // 중간 버튼 스타일
  lg: "h-14 px-6 text-base", // 큰 버튼 스타일
};

/**
 * 버튼 컴포넌트
 * - `variant` prop으로 버튼의 스타일을 선택할 수 있음
 * - `size` prop으로 버튼의 크기를 선택할 수 있음
 * - `fullWidth` prop으로 버튼이 부모 요소의 전체 너비를 차지하도록 할 수 있음
 * @param param0 
 * @returns 
 * @example
 * <Button variant="primary" size="md" fullWidth onClick={handleClick}>
 *   클릭하세요
 * </Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "lg",
      fullWidth = false,
      type = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] font-semibold transition-colors disabled:cursor-not-allowed",
          variantClass[variant],
          sizeClass[size],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

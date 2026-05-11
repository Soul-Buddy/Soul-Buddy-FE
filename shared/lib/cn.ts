import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 클래스 이름을 조건부로 조합하는 유틸리티 함수
 * - `clsx`를 사용하여 다양한 형태의 클래스 입력을 처리하고, `twMerge`로 Tailwind CSS 클래스 이름을 병합하여 최적화된 결과를 반환(충돌 해결)
 * @param inputs
 * @returns
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

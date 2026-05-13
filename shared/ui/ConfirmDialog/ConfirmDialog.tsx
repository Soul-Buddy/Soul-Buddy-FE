"use client";

import { useEffect } from "react";
import { Button } from "@/shared/ui/Button";

type ConfirmVariant = "primary" | "danger";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmVariant;
  onConfirm: () => void;
  onClose: () => void;
}

/**
 * 확인 모달
 * - ESC 키 / 배경 클릭으로 닫힘
 * - confirm 버튼 색상은 variant 로 제어 ("primary" | "danger")
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "확인",
  cancelLabel = "취소",
  variant = "primary",
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    // 모달 배경 (클릭 시 onClose 호출)
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      {/* 모달 내용 */}
      <div
        className="w-full max-w-xs rounded-2xl bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 제목 */}
        <p className="text-center text-[15px] font-semibold text-[var(--color-text)]">
          {title}
        </p>
        {/* 모달 설명 */}
        {description && (
          <p className="mt-1 text-center text-[13px] text-[var(--color-text-muted)]">
            {description}
          </p>
        )}
        {/* 버튼 그룹 */}
        <div className="mt-5 flex gap-2">
          {/* 취소 버튼 */}
          <Button variant="secondary" size="sm" fullWidth onClick={onClose}>
            {cancelLabel}
          </Button>
          {/* 확인 버튼 */}
          <Button variant={variant} size="sm" fullWidth onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

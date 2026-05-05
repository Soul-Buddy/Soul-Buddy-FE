"use client";

import { useState, type KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { IconButton } from "@/shared/ui/IconButton";

interface ComposerProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function Composer({ onSend, disabled }: ComposerProps) {
  const [value, setValue] = useState("");

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="flex items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-surface)] px-4 py-2">
      <input
        type="text"
        value={value}
        placeholder="편하게 이야기 해주세요."
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent text-[14px] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
      />
      <IconButton
        variant="primary"
        size="sm"
        aria-label="메시지 전송"
        disabled={disabled || value.trim().length === 0}
        onClick={submit}
      >
        <Send />
      </IconButton>
    </div>
  );
}

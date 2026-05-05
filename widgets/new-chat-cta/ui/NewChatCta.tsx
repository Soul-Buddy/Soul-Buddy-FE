"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";

export function NewChatCta() {
  const router = useRouter();

  return (
    <Card surface="dark" padding="lg" className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Plus className="h-4 w-4 text-[var(--color-primary)]" />
        <span className="text-xs uppercase tracking-wider text-[var(--color-primary)]">
          새 대화
        </span>
      </div>
      <h3 className="text-[18px] font-bold leading-snug">
        지금 마음을
        <br />
        나눠 볼까요?
      </h3>
      <Button
        variant="primary"
        size="md"
        onClick={() => router.push("/chat/new/buddy")}
        className="self-start"
      >
        새 대화 열기
      </Button>
    </Card>
  );
}

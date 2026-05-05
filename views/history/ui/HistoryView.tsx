"use client";

import { AppHeader } from "@/shared/ui/AppHeader";
import { BackButton } from "@/shared/ui/BackButton";
import { Screen } from "@/shared/ui/Screen";
import { HistoryList } from "@/widgets/history-list";
import { MOCK_HISTORY_CONVERSATIONS } from "@/shared/api/mock/fixtures";

export function HistoryView() {
  return (
    <Screen
      header={
        <AppHeader
          leading={
            <div className="flex items-center gap-2">
              <BackButton fallbackHref="/" />
              <span className="text-[16px] font-semibold text-[var(--color-text)]">
                대화 기록
              </span>
            </div>
          }
        />
      }
    >
      <div className="mt-2">
        <HistoryList conversations={MOCK_HISTORY_CONVERSATIONS} />
      </div>
    </Screen>
  );
}

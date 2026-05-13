"use client";

import { useSyncExternalStore } from "react";
import { Screen } from "@/shared/ui/Screen";
import { MainGreeting } from "@/widgets/main-greeting";
import { RecentConversationsSection } from "@/widgets/recent-conversations";
import { MainShortcuts } from "@/widgets/main-shortcuts";
import { NewChatCta } from "@/widgets/new-chat-cta";
import { loadProfileMock } from "@/shared/api/mock/profileStorage";
import {
  MOCK_RECENT_CONVERSATIONS,
  MOCK_HISTORY_CONVERSATIONS,
  MOCK_CENTERS,
} from "@/shared/api/mock/fixtures";

const FALLBACK_NAME = "친구";

function subscribeProfile() {
  return () => {};
}

function getProfileName() {
  return loadProfileMock()?.name ?? FALLBACK_NAME;
}

function getServerProfileName() {
  return FALLBACK_NAME;
}

export function MainView() {
  const userName = useSyncExternalStore(
    subscribeProfile,
    getProfileName,
    getServerProfileName,
  );

  return (
    <Screen>
      <div className="flex flex-col gap-6 pt-7">
        {/* 메인 화면 상단 */}
        <MainGreeting userName={userName} />
        {/* 최근이야기 */}
        <RecentConversationsSection conversations={MOCK_RECENT_CONVERSATIONS} />
        {/* 대화 기록 / 상담 센터 섹션 */}
        <MainShortcuts
          historyCount={MOCK_HISTORY_CONVERSATIONS.length}
          centerCount={MOCK_CENTERS.length}
        />
        {/* 새로운 대화 버튼 */}
        <NewChatCta />
      </div>
    </Screen>
  );
}

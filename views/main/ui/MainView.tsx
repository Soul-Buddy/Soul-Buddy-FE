"use client";

import { AppHeader } from "@/shared/ui/AppHeader";
import { Screen } from "@/shared/ui/Screen";
import { MainGreeting } from "@/widgets/main-greeting";
import { RecentConversationsSection } from "@/widgets/recent-conversations";
import { MainShortcuts } from "@/widgets/main-shortcuts";
import { NewChatCta } from "@/widgets/new-chat-cta";
import {
  MOCK_USER_NAME,
  MOCK_RECENT_CONVERSATIONS,
  MOCK_HISTORY_CONVERSATIONS,
  MOCK_CENTERS,
} from "@/shared/api/mock/fixtures";

export function MainView() {
  return (
    // header={<AppHeader />}
    <Screen >  
      <div className="flex flex-col gap-6">
        {/* 메인 화면 상단 */}
        <MainGreeting userName={MOCK_USER_NAME} /> 
        {/* 최근이야기 */}
        <RecentConversationsSection conversations={MOCK_RECENT_CONVERSATIONS} />
        <MainShortcuts
          historyCount={MOCK_HISTORY_CONVERSATIONS.length}
          centerCount={MOCK_CENTERS.length}
        />
        <NewChatCta />
      </div>
    </Screen>
  );
}

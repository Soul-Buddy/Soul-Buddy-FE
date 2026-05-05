"use client";

import { Map } from "lucide-react";
import { sortByDistance } from "@/features/center/find-nearby";
import { AppHeader } from "@/shared/ui/AppHeader";
import { BackButton } from "@/shared/ui/BackButton";
import { IconButton } from "@/shared/ui/IconButton";
import { Screen } from "@/shared/ui/Screen";
import { EmergencyBar } from "@/widgets/emergency-bar";
import { CenterList } from "@/widgets/center-list";
import { MOCK_CENTERS } from "@/shared/api/mock/fixtures";

export function CentersView() {
  const centers = sortByDistance(MOCK_CENTERS);

  return (
    <Screen
      header={
        <AppHeader
          leading={
            <div className="flex items-center gap-2">
              <BackButton fallbackHref="/" />
              <span className="text-[16px] font-semibold text-[var(--color-text)]">
                상담 센터
              </span>
            </div>
          }
          trailing={
            <IconButton
              variant="surface"
              size="sm"
              aria-label="지도 보기"
              onClick={() => alert("지도 화면 준비중")}
            >
              <Map />
            </IconButton>
          }
        />
      }
    >
      <div className="mt-2 flex flex-col gap-5">
        <EmergencyBar />
        <CenterList centers={centers} />
      </div>
    </Screen>
  );
}

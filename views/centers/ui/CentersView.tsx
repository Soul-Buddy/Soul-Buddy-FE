"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Map } from "lucide-react";
import { useNearbyCenters } from "@/features/center/find-nearby";
import { useGeolocation } from "@/shared/lib/geolocation";
import { TopBar } from "@/shared/ui/TopBar";
import { BackButton } from "@/shared/ui/BackButton";
import { IconButton } from "@/shared/ui/IconButton";
import { Button } from "@/shared/ui/Button";
import { Screen } from "@/shared/ui/Screen";
import { EmergencyBar } from "@/widgets/emergency-bar";
import { CenterList } from "@/widgets/center-list";
import { CenterCardSkeleton } from "@/entities/center";

const SKELETON_COUNT = 4;

export function CentersView() {
  const { status: geoStatus, coords, retry } = useGeolocation();
  const { centers, status: fetchStatus, hasMore, loadMore, isLoadingMore } =
    useNearbyCenters(coords);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;
    const target = sentinelRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: "100px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  const isInitialLoading =
    geoStatus === "loading" ||
    (geoStatus === "success" && fetchStatus === "loading");

  return (
    <Screen
      header={
        <TopBar
          leading={
            <div className="flex items-center gap-2">
              <BackButton fallbackHref="/" />
              <span className="text-[16px] font-semibold text-[var(--color-text)]">
                상담 센터
              </span>
            </div>
          }
          trailing={
            <Link href="/centers/map" aria-label="지도 보기">
              <IconButton variant="surface" size="sm" aria-label="지도 보기">
                <Map />
              </IconButton>
            </Link>
          }
        />
      }
    >
      <div className="mt-2 flex flex-col gap-5">
        <EmergencyBar />

        {geoStatus === "error" ? (
          <div className="flex flex-col items-center gap-3 rounded-[var(--radius-lg)] bg-[var(--color-surface)] p-6 text-center">
            <p className="text-sm text-[var(--color-text-muted)]">
              위치 정보를 가져올 수 없습니다.
            </p>
            <Button variant="primary" size="sm" onClick={retry}>
              다시 시도
            </Button>
          </div>
        ) : isInitialLoading ? (
          <section className="flex flex-col gap-3">
            <h2 className="text-[15px] font-semibold text-[var(--color-text)]">
              근처 센터
            </h2>
            <div className="flex flex-col gap-2">
              {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <CenterCardSkeleton key={i} />
              ))}
            </div>
          </section>
        ) : fetchStatus === "error" ? (
          <div className="flex flex-col items-center gap-3 rounded-[var(--radius-lg)] bg-[var(--color-surface)] p-6 text-center">
            <p className="text-sm text-[var(--color-text-muted)]">
              상담소 정보를 불러오지 못했습니다.
            </p>
            <Button variant="primary" size="sm" onClick={retry}>
              다시 시도
            </Button>
          </div>
        ) : (
          <>
            <CenterList centers={centers} />
            {hasMore && <div ref={sentinelRef} className="h-1" />}
            {isLoadingMore && (
              <div className="flex flex-col gap-2">
                {Array.from({ length: 2 }).map((_, i) => (
                  <CenterCardSkeleton key={i} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Screen>
  );
}

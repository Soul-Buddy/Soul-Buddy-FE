"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useNearbyCenters } from "@/features/center/find-nearby";
import { useGeolocation } from "@/shared/lib/geolocation";
import { TopBar } from "@/shared/ui/TopBar";
import { BackButton } from "@/shared/ui/BackButton";
import { Button } from "@/shared/ui/Button";
import { Screen } from "@/shared/ui/Screen";
import { CenterCard, type CounselCenter } from "@/entities/center";

type KakaoLatLng = { getLat: () => number; getLng: () => number };
type KakaoMarker = {
  setMap: (map: KakaoMap | null) => void;
};
type KakaoMap = {
  setCenter: (latLng: KakaoLatLng) => void;
  setLevel: (level: number) => void;
};

interface KakaoMaps {
  LatLng: new (lat: number, lng: number) => KakaoLatLng;
  Map: new (container: HTMLElement, options: { center: KakaoLatLng; level: number }) => KakaoMap;
  Marker: new (options: { position: KakaoLatLng; map?: KakaoMap; title?: string }) => KakaoMarker;
  event: {
    addListener: (target: KakaoMarker, type: string, handler: () => void) => void;
  };
  load: (cb: () => void) => void;
}

declare global {
  interface Window {
    kakao?: { maps: KakaoMaps };
  }
}

const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
const SDK_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&autoload=false`;

/**
 * 근처 상담 센터를 지도에 표시하는 컴포넌트
 * @returns
 */
export function CentersMapView() {
  const { status: geoStatus, coords, retry } = useGeolocation(); // 사용자 위치 정보 가져오기
  const { centers, status: fetchStatus } = useNearbyCenters(coords); // 근처 상담 센터 데이터 가져오기

  const containerRef = useRef<HTMLDivElement | null>(null); // 지도 컨테이너 참조
  const mapRef = useRef<KakaoMap | null>(null); // KakaoMap 인스턴스 참조
  const markersRef = useRef<KakaoMarker[]>([]); // 지도에 표시된 마커 참조 배열
  const [sdkReady, setSdkReady] = useState(false); // Kakao SDK 로드 상태
  const [sdkError, setSdkError] = useState(false); // Kakao SDK 로드 에러 상태
  const [selected, setSelected] = useState<CounselCenter | null>(null); // 선택된 상담 센터 상태

  // Kakao SDK가 로드되고 위치 정보가 준비되면 지도를 초기화하거나 중심을 업데이트
  useEffect(() => {
    if (!sdkReady || !coords || !containerRef.current) return; // SDK가 준비되지 않았거나 위치 정보가 없으면 초기화 중단
    if (!window.kakao?.maps) return; // Kakao Maps 객체가 존재하지 않으면 초기화 중단

    const kakao = window.kakao.maps; // Kakao Maps 객체 참조
    kakao.load(() => {
      if (!containerRef.current) return; // 지도 컨테이너가 존재하지 않으면 초기화 중단
      if (!mapRef.current) {
        // 지도 인스턴스가 아직 생성되지 않았다면 새로 생성
        mapRef.current = new kakao.Map(containerRef.current, {
          // 지도 초기화 옵션
          center: new kakao.LatLng(coords.lat, coords.lng), // 초기 중심 좌표 설정
          level: 5, // 초기 확대 레벨 설정
        });
      } else {
        mapRef.current.setCenter(new kakao.LatLng(coords.lat, coords.lng)); // 위치 정보가 업데이트되면 지도 중심 좌표 업데이트
      }
    });
  }, [sdkReady, coords]); // SDK 로드 상태와 위치 정보가 변경될 때마다 실행

  // 상담 센터 데이터가 변경될 때마다 지도에 마커를 업데이트
  useEffect(() => {
    if (!sdkReady || !mapRef.current || !window.kakao?.maps) return; // SDK가 준비되지 않았거나 지도 인스턴스가 없으면 마커 업데이트 중단
    const kakao = window.kakao.maps; // Kakao Maps 객체 참조

    markersRef.current.forEach((m) => m.setMap(null)); // 기존 마커를 지도에서 제거
    markersRef.current = []; // 마커 참조 배열 초기화

    // 새로운 상담 센터 데이터에 대해 마커를 생성하고 지도에 표시
    centers.forEach((center) => {
      const marker = new kakao.Marker({
        // 마커 생성 옵션
        position: new kakao.LatLng(center.lat, center.lng), // 마커 위치 좌표 설정
        map: mapRef.current!, // 마커가 표시될 지도 인스턴스 설정
        title: center.name, // 마커에 마우스 오버 시 표시될 타이틀 설정
      });
      kakao.event.addListener(marker, "click", () => setSelected(center)); // 마커 클릭 시 해당 상담 센터를 선택 상태로 설정하는 이벤트 리스너 등록
      markersRef.current.push(marker); // 생성된 마커를 참조 배열에 추가
    });
  }, [centers, sdkReady]); // 상담 센터 데이터와 SDK 로드 상태가 변경될 때마다 실행

  return (
    <Screen
      noPadding
      header={
        <TopBar
          className="px-2"
          leading={
            <div className="flex items-center gap-2">
              <BackButton fallbackHref="/centers" />
              <span className="text-[16px] font-semibold text-[var(--color-text)]">
                지도에서 보기
              </span>
            </div>
          }
        />
      }
    >
      {KAKAO_JS_KEY && (
        <Script
          src={SDK_URL}
          strategy="afterInteractive"
          onLoad={() => setSdkReady(true)}
          onError={() => setSdkError(true)}
        />
      )}

      <div className="relative flex-1">
        {geoStatus === "error" || !KAKAO_JS_KEY || sdkError ? (
          // 지도를 로드 성공했을 경우
          <div className="flex h-full flex-col items-center justify-center gap-3 px-5">
            <p className="text-sm text-[var(--color-text-muted)]">
              {!KAKAO_JS_KEY
                ? "지도 키가 설정되지 않았습니다."
                : sdkError
                  ? "지도를 불러오지 못했습니다. 새로고침해 주세요."
                  : "위치 정보를 가져올 수 없습니다."}
            </p>
            {geoStatus === "error" && (
              <Button variant="primary" size="sm" onClick={retry}>
                다시 시도
              </Button>
            )}
          </div>
        ) : (
          // 지도 컨테이너와 상태 메시지, 선택된 상담 센터 카드 렌더링 (로딩 중, 실패 등)
          <>
            <div ref={containerRef} className="h-full w-full" />
            {fetchStatus === "loading" && (
              <div className="pointer-events-none absolute inset-x-0 top-3 flex justify-center">
                <span className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs text-[var(--color-text-muted)] shadow-[var(--shadow-card)]">
                  근처 상담소를 불러오는 중…
                </span>
              </div>
            )}
            {fetchStatus === "success" && centers.length === 0 && (
              <div className="pointer-events-none absolute inset-x-0 top-3 flex justify-center">
                <span className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs text-[var(--color-text-muted)] shadow-[var(--shadow-card)]">
                  근처에 상담소가 없습니다.
                </span>
              </div>
            )}
            {fetchStatus === "error" && (
              <div className="pointer-events-none absolute inset-x-0 top-3 flex justify-center">
                <span className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs text-[var(--color-text-muted)] shadow-[var(--shadow-card)]">
                  상담소 정보를 불러오지 못했습니다.
                </span>
              </div>
            )}

            {selected && (
              <div
                className="absolute inset-x-0 bottom-0 z-20 px-4 pb-5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <button
                    type="button"
                    aria-label="닫기"
                    onClick={() => setSelected(null)}
                    className="absolute -top-7 right-3 z-10 rounded-full bg-[var(--color-dark-soft)] px-2 py-1 text-xs text-white"
                  >
                    닫기
                  </button>
                  {/* 선택된 상담 센터 정보를 표시하는 카드 */}
                  <CenterCard center={selected} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Screen>
  );
}

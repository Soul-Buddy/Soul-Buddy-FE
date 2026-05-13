"use client";

import { useCallback, useEffect, useState } from "react";

export interface Coords {
  lat: number; // 위도(latitude) 정보를 나타내는 숫자 타입의 lat 속성
  lng: number; // 경도(longitude) 정보를 나타내는 숫자 타입의 lng 속성
}

export type GeolocationStatus = "loading" | "success" | "error";

interface GeolocationState {
  status: GeolocationStatus; // 현재 지리 위치 정보의 상태를 나타내는 status 속성 (로딩 중, 성공, 에러)
  coords: Coords | null; // 사용자의 현재 위치 정보를 담는 coords 속성, 위치 정보가 없을 경우 null
  retry: () => void; // 위치 정보 요청을 재시도하는 함수인 retry 속성
}

/**
 * 사용자의 현재 위치 정보를 요청하는 함수
 * @param onSuccess  - 위치 정보 요청이 성공했을 때 호출되는 콜백 함수, Coords 타입의 위치 정보를 인자로 받음
 * @param onError - 위치 정보 요청이 실패했을 때 호출되는 콜백 함수, 인자는 없음
 * @returns
 */
function requestPosition(onSuccess: (c: Coords) => void, onError: () => void) {
  if (typeof window === "undefined" || !navigator.geolocation) {
    // 브라우저 환경이 아니거나 지리 위치 API를 지원하지 않는 경우
    onError();
    return;
  }
  // 사용자의 현재 위치 정보를 가져오는 메서드
  navigator.geolocation.getCurrentPosition(
    // 위치 정보 요청이 성공했을 때, 위도와 경도 정보를 Coords 객체로 만들어 onSuccess 콜백 함수에 전달
    (pos) => onSuccess({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
    onError,
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
  );
}

/**
 * 사용자의 지리 위치 정보를 관리하는 커스텀 훅
 */
export function useGeolocation(): GeolocationState {
  const [status, setStatus] = useState<GeolocationStatus>("loading"); // 지리 위치 정보의 초기 상태를 "loading"으로 설정
  const [coords, setCoords] = useState<Coords | null>(null); // 위치 정보의 초기값을 null로 설정

  // 컴포넌트가 마운트될 때 위치 정보 요청을 시작하는 useEffect 훅
  useEffect(() => {
    let cancelled = false; // 요청이 취소되었는지 여부를 나타내는 플래그 변수
    requestPosition(
      // 위치 정보 요청이 성공했을 때 호출되는 콜백 함수
      (c) => {
        if (cancelled) return; // 요청이 취소된 경우, 위치 정보 상태를 업데이트하지 않고 함수 종료
        setCoords(c); // 위치 정보를 상태에 저장
        setStatus("success"); // 위치 정보 요청이 성공했음을 나타내는 상태로 업데이트
      },
      // 위치 정보 요청이 실패했을 때 호출되는 콜백 함수
      () => {
        if (cancelled) return; // 요청이 취소된 경우, 위치 정보 상태를 업데이트하지 않고 함수 종료
        setCoords(null); // 위치 정보를 null로 설정하여 위치 정보가 없음을 나타냄
        setStatus("error"); // 위치 정보 요청이 실패했음을 나타내는 상태로 업데이트
      }
    );
    return () => {
      cancelled = true; // 컴포넌트가 언마운트될 때 요청이 취소되었음을 나타내는 플래그를 true로 설정하여 이후 콜백 함수에서 상태 업데이트를 방지
    };
  }, []);

  // 위치 정보 요청을 재시도하는 함수
  const retry = useCallback(() => {
    setStatus("loading"); // 위치 정보 요청을 재시도할 때 상태를 "loading"으로 설정하여 로딩 상태로 전환
    setCoords(null); // 위치 정보를 null로 초기화하여 이전 위치 정보가 남아있지 않도록 함
    // 위치 정보 요청을 다시 시작
    requestPosition(
      (c) => {
        setCoords(c); // 위치 정보를 상태에 저장
        setStatus("success"); // 위치 정보 요청이 성공했음을 나타내는 상태로 업데이트
      },
      () => {
        setCoords(null); // 위치 정보를 null로 설정하여 위치 정보가 없음을 나타냄
        setStatus("error"); // 위치 정보 요청이 실패했음을 나타내는 상태로 업데이트
      }
    );
  }, []);

  return { status, coords, retry };
}

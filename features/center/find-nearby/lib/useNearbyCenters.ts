"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CounselCenter } from "@/entities/center";
import type { Coords } from "@/shared/lib/geolocation";

const MAX_PAGES = 2;

interface NearbyResponse {
  centers: CounselCenter[];
  isEnd: boolean;
  page: number;
}

interface UseNearbyCentersResult {
  centers: CounselCenter[];
  status: "idle" | "loading" | "success" | "error";
  hasMore: boolean;
  loadMore: () => void;
  isLoadingMore: boolean;
}

/**
 * 주어진 좌표 근처의 상담 센터 목록을 가져오는 커스텀 훅
 * @param coords // 사용자 위치 정보(위도, 경도)
 * @returns
 */
export function useNearbyCenters(coords: Coords | null): UseNearbyCentersResult {
  const [centers, setCenters] = useState<CounselCenter[]>([]); // 근처 상담 센터 목록 상태
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle"); // 데이터 로딩 상태
  const [page, setPage] = useState(1); // 현재 페이지 번호 상태
  const [isEnd, setIsEnd] = useState(false); // 더 이상 불러올 데이터가 없는지 여부 상태
  const [isLoadingMore, setIsLoadingMore] = useState(false); // 추가 페이지 로딩 상태
  const requestIdRef = useRef(0); // 중복된 요청을 방지하기 위한 요청 ID 참조

  // 특정 페이지의 상담 센터 데이터를 가져오는 함수
  const fetchPage = useCallback(async (targetPage: number, replace: boolean, current: Coords) => {
    const myId = ++requestIdRef.current; // 현재 요청의 고유 ID 생성
    if (replace)
      setStatus("loading"); // 새로고침인 경우 로딩 상태로 설정, 그렇지 않으면 추가 페이지 로딩 상태로 설정
    else setIsLoadingMore(true); // 추가 페이지 로딩 상태로 설정
    try {
      // Next.js API 라우트를 통해 서버 측에서 카카오 API에 요청하여 근처 상담 센터 데이터를 가져옵니다.
      const res = await fetch(
        `/api/centers/nearby?lat=${current.lat}&lng=${current.lng}&page=${targetPage}`
      );
      if (!res.ok) throw new Error("request failed"); // 요청이 실패한 경우 에러를 던져 catch 블록에서 처리
      const data = (await res.json()) as NearbyResponse; // API 응답을 NearbyResponse 타입으로 명시적으로 지정
      if (myId !== requestIdRef.current) return; // 응답이 도착했을 때 현재 요청 ID와 일치하지 않으면, 이는 중복된 요청이므로 무시
      setCenters((prev) => (replace ? data.centers : [...prev, ...data.centers])); // 새로고침인 경우 기존 데이터를 대체하고, 추가 페이지인 경우 기존 데이터에 새 데이터를 추가
      setIsEnd(data.isEnd); // 더 이상 불러올 데이터가 없는지 여부 업데이트
      setPage(targetPage); // 현재 페이지 번호 업데이트
      setStatus("success"); // 데이터 로딩 성공 상태로 설정
    } catch {
      if (myId !== requestIdRef.current) return; // 에러가 발생했을 때 현재 요청 ID와 일치하지 않으면, 이는 중복된 요청이므로 무시
      setStatus("error"); // 데이터 로딩 에러 상태로 설정
    } finally {
      if (myId === requestIdRef.current) setIsLoadingMore(false); // 요청이 완료된 경우에만 추가 페이지 로딩 상태 해제
    }
  }, []);

  // 좌표가 변경될 때마다 상담 센터 데이터를 새로고침하여 가져옵니다.
  useEffect(() => {
    if (!coords) return; // 좌표 정보가 없는 경우 데이터 가져오기 중단
    setCenters([]); // 기존 상담 센터 목록 초기화
    setPage(1); // 페이지 번호 초기화
    setIsEnd(false); // 더 이상 불러올 데이터가 없는지 여부 초기화
    fetchPage(1, true, coords); // 첫 페이지 데이터를 새로고침하여 가져오기
  }, [coords, fetchPage]);

  const hasMore = !isEnd && page < MAX_PAGES && status === "success"; // 추가 페이지를 불러올 수 있는지 여부 계산

  // 추가 페이지를 불러오는 함수
  const loadMore = useCallback(() => {
    if (!coords || !hasMore || isLoadingMore) return; // 좌표 정보가 없거나, 더 이상 불러올 데이터가 없거나, 이미 추가 페이지를 불러오는 중인 경우 중단
    fetchPage(page + 1, false, coords); // 다음 페이지 데이터를 추가로 가져오기
  }, [coords, hasMore, isLoadingMore, page, fetchPage]); // 다음 페이지 데이터를 추가로 가져오는 함수, 의존성 배열에 필요한 값들을 포함하여 메모이제이션

  return { centers, status, hasMore, loadMore, isLoadingMore };
}

import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const withPWA = withPWAInit({
  dest: "public", // 서비스 워커 파일 저장 위치
  cacheOnFrontEndNav: true, // SPA처럼 빠른 페이지 전환 캐싱
  aggressiveFrontEndNavCaching: true, // 더 공격적인 캐싱 (속도 우선)
  reloadOnOnline: true, // 온라인 복구 시 자동 새로고침
  disable: process.env.NODE_ENV === "development", // 개발 모드에선 PWA 비활성화
});

const nextConfig: NextConfig = {
  turbopack: {}, // Turbopack 사용 명시 (webpack 경고 억제)
};

export default withPWA(nextConfig);

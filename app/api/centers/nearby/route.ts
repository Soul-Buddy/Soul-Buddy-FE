import { NextResponse } from "next/server";
import {
  mapKakaoPlaceToCenter,
  type KakaoSearchResponse,
} from "@/features/center/find-nearby/lib/kakaoMapper";

const KAKAO_KEYWORD_URL = "https://dapi.kakao.com/v2/local/search/keyword.json";
const SEARCH_KEYWORD = "심리상담";
const DEFAULT_RADIUS = 5000;
const PAGE_SIZE = 10;

export async function GET(request: Request) {
  const apiKey = process.env.KAKAO_REST_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "KAKAO_REST_API_KEY is not configured" }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const page = Number(searchParams.get("page") ?? "1");

  if (!lat || !lng) {
    return NextResponse.json({ error: "lat and lng are required" }, { status: 400 });
  }
  /**
   * 카카오 키워드 검색 API를 사용하여 근처 상담 센터를 조회
   */
  const params = new URLSearchParams({
    query: SEARCH_KEYWORD,
    x: lng,
    y: lat,
    radius: String(DEFAULT_RADIUS),
    sort: "distance",
    size: String(PAGE_SIZE),
    page: String(page),
  });

  /**
   * 카카오 API는 CORS를 지원하지 않으므로, Next.js API 라우트를 통해 서버 측에서 요청을 프록시하여 데이터를 가져옵니다.
   * 이렇게 하면 클라이언트에서 직접 카카오 API에 요청하는 대신, 서버가 대신 요청을 처리하고 결과를 반환할 수 있습니다.
   */
  const response = await fetch(`${KAKAO_KEYWORD_URL}?${params.toString()}`, {
    headers: { Authorization: `KakaoAK ${apiKey}` }, // 카카오 API 인증 헤더
    cache: "no-store", // 매번 최신 데이터를 가져오기 위해 캐시 사용 안 함
  });

  /**
   * 카카오 API 요청이 실패한 경우, 적절한 에러 메시지와 함께 502 Bad Gateway 상태 코드를 반환합니다.
   * 이는 클라이언트에게 외부 API 요청이 실패했음을 명확히 전달하기 위함입니다.
   */
  if (!response.ok) {
    return NextResponse.json(
      { error: "Kakao API request failed", status: response.status },
      { status: 502 }
    );
  }

  const data = (await response.json()) as KakaoSearchResponse; // API 응답을 KakaoSearchResponse 타입으로 명시적으로 지정
  const centers = data.documents.map(mapKakaoPlaceToCenter); // 카카오 API 응답을 내부 CounselCenter 타입으로 변환

  /**
   * 변환된 상담 센터 데이터와 함께 페이지 정보 및 더 이상 데이터가 없는지 여부를 클라이언트에 반환합니다.
   * isEnd 필드는 클라이언트가 추가 페이지를 요청할 수 있는지 여부를 판단하는 데 사용됩니다.
   */
  return NextResponse.json({
    centers,
    isEnd: data.meta.is_end,
    page,
  });
}

import type { CounselCenter } from "@/entities/center";

export interface KakaoPlace {
  id: string;
  place_name: string;
  category_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  distance: string;
}

export interface KakaoSearchResponse {
  documents: KakaoPlace[];
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
}

/**
 * 카테고리 이름에서 태그를 추출(예: "상담 > 심리 상담"에서 "심리 상담" 태그 추출)
 * @param categoryName // 카카오 API에서 제공하는 카테고리 이름 문자열
 * @returns
 */
function deriveTags(categoryName: string): string[] {
  if (!categoryName) return []; // 카테고리 이름이 없는 경우 빈 배열 반환
  const segments = categoryName
    .split(">")
    .map((s) => s.trim())
    .filter(Boolean); // ">"로 구분하여 세그먼트로 나누고, 각 세그먼트를 트림한 후 빈 문자열 제거
  const last = segments.at(-1); // 마지막 세그먼트가 가장 구체적인 카테고리이므로 이를 태그로 사용
  return last ? [last] : []; // 마지막 세그먼트가 존재하면 배열로 반환, 그렇지 않으면 빈 배열 반환
}

/**
 * 카카오 장소 정보를 상담 센터 객체로 매핑
 * @param place // 카카오 API에서 반환된 장소 정보 객체
 * @returns
 */
export function mapKakaoPlaceToCenter(place: KakaoPlace): CounselCenter {
  return {
    id: place.id, // 카카오 장소 ID를 상담 센터 ID로 사용
    name: place.place_name, // 카카오 장소 이름을 상담 센터 이름으로 사용
    address: place.road_address_name || place.address_name, // 도로명 주소가 있으면 사용하고, 없으면 지번 주소 사용
    distanceM: place.distance ? Number(place.distance) : 0, // 카카오 API에서 제공하는 거리를 숫자로 변환하여 사용, 없으면 0으로 설정
    tags: deriveTags(place.category_name), // 카테고리 이름에서 태그 추출
    hours: "", // 카카오 API에서는 영업 시간 정보를 제공하지 않음
    phone: place.phone, // 카카오 장소 전화번호를 상담 센터 전화번호로 사용
    lat: Number(place.y), // 카카오 API에서 제공하는 위도 정보를 숫자로 변환하여 사용
    lng: Number(place.x), // 카카오 API에서 제공하는 경도 정보를 숫자로 변환하여 사용
  };
}

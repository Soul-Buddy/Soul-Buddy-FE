import type { CounselCenter } from "@/entities/center";

export function sortByDistance(centers: CounselCenter[]): CounselCenter[] {
  return [...centers].sort((a, b) => a.distanceM - b.distanceM);
}

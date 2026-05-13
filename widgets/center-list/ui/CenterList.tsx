"use client";

import { CenterCard, type CounselCenter } from "@/entities/center";

interface CenterListProps {
  centers: CounselCenter[];
}

export function CenterList({ centers }: CenterListProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-[15px] font-semibold text-[var(--color-text)]">
        근처 센터
      </h2>
      {centers.length === 0 ? (
        <p className="text-sm text-[var(--color-text-muted)]">
          근처에 상담소가 없습니다.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {centers.map((center) => (
            <CenterCard key={center.id} center={center} />
          ))}
        </div>
      )}
    </section>
  );
}

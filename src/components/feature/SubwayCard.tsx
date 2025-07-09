import { Station } from "@/types/station";
import React from "react";
const STYLES = {
  stationMark:
    "rounded-full font-semibold flex justify-center items-center text-[var(--color-white)] text-xs",
};

interface SubwayCardProps {
  station: Station;
}

const SubwayCard: React.FC<SubwayCardProps> = ({ station }) => {
  return (
    <>
      <div
        className="w-full py-4 flex-col flex gap-3 items-center justify-center rounded-lg border border-[var(--color-gray-border)] hover:border-[var(--color-primary-400)] bg-[var(--color-white)]
      hover:bg-[var(--color-primary-100)] transition duration-300 cursor-pointer
      "
      >
        <div className="flex gap-2 items-center justify-center">
          {station.metroLines.map((line, idx) => {
            const isSingleChar = line.length === 1;
            const widthClass = isSingleChar ? "w-5 h-5" : "px-2 py-1 rounded";
            const bgColor = station.stationColors[idx] || "#353535";
            return (
              <p
                key={idx}
                className={`${widthClass} ${STYLES.stationMark}`}
                style={{ backgroundColor: bgColor }}
              >
                {line}
              </p>
            );
          })}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-base text-[var(--color-black)] text-center font-medium">
            {station.locationName}
          </h1>
          <h2 className="text-sm text-[var(--color-gray-placeholder)] text-center">
            이동 시간 : {station.travelTime}분
          </h2>
        </div>
      </div>
    </>
  );
};
export default SubwayCard;

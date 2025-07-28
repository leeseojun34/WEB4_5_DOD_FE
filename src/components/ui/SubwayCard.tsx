import { Station } from "@/types/station";
import React from "react";
import { OptionBox } from "../ui/OptionBox";

const STYLES = {
  stationMark:
    "rounded-full font-semibold flex justify-center items-center text-[var(--color-white)] text-xs",
};

interface SubwayCardProps {
  station: Station;
  isSelected: boolean;
  isPointer?: boolean;
}

interface MetroTransfer {
  line: string;
  color: string;
}

const SubwayCard: React.FC<SubwayCardProps> = ({
  station,
  isSelected,
  isPointer = true,
}) => {
  return (
    <>
      <OptionBox isSelected={isSelected} isPointer={isPointer}>
        <div className="flex gap-2 items-center justify-center">
          {station.metroTransfer.map((transfer, idx) => {
            const isSingleChar = transfer.length === 1;
            const widthClass = isSingleChar ? "w-5 h-5" : "px-2 py-1 rounded";

            return (
              <p
                key={idx}
                className={`${widthClass} ${STYLES.stationMark}`}
                style={{ backgroundColor: transfer.color }}
              >
                {transfer.line}
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
      </OptionBox>
    </>
  );
};
export default SubwayCard;

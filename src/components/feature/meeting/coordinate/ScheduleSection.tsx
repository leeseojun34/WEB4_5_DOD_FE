import Schedule from "@/components/feature/Schedule";
import LoadButton from "./LoadButton";
import React from "react";

interface ScheduleSectionProps {
  title: React.ReactNode;
  showLoadButton?: boolean;
  className?: string;
  eventScheduleInfo?: EventTimeTableType;
}

/**
 * TODO: 내 시간표 가져오기 기능 추가
 *
 * @returns
 */
const ScheduleSection = ({
  title,
  showLoadButton = false,
  className = "",
  eventScheduleInfo,
}: ScheduleSectionProps) => {
  return (
    <div className={`flex flex-col gap-6 w-full ${className}`}>
      <div className="flex justify-between items-center px-5">
        <div className="text-[color:var(--color-black)] font-semibold">
          {title}
        </div>
        {showLoadButton && <LoadButton />}
      </div>
      <div className="flex justify-center w-full">
        <Schedule eventScheduleInfo={eventScheduleInfo} />
      </div>
    </div>
  );
};

export default ScheduleSection;

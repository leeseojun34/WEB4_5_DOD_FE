import CommonSchedule from "@/components/feature/CommonSchedule";
import LoadButton from "./LoadButton";
import React from "react";
import Schedule from "@/components/feature/Schedule";

interface ScheduleSectionProps {
  title: React.ReactNode;
  showLoadButton?: boolean;
  className?: string;
  eventScheduleInfo: EventScheduleInfoType;
  mode: "my" | "common";
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
  mode,
}: ScheduleSectionProps) => {
  return (
    <div className={`flex flex-col gap-6 w-full ${className}`}>
      <div className="flex justify-between items-center">
        <div className="text-[color:var(--color-black)] font-semibold">
          {title}
        </div>
        {showLoadButton && <LoadButton />}
      </div>
      <div className="flex justify-center w-full">
        {mode === "my" ? (
          <Schedule eventScheduleInfo={eventScheduleInfo.timeTable} />
        ) : (
          <CommonSchedule eventScheduleInfo={eventScheduleInfo} />
        )}
      </div>
    </div>
  );
};

export default ScheduleSection;

"use client";

import CommonSchedule from "@/components/feature/CommonSchedule";
import LoadButton from "./LoadButton";
import React, { useState } from "react";
import Schedule from "@/components/feature/Schedule";
import { getMySchedule } from "@/lib/api/scheduleApi";

interface ScheduleSectionProps {
  title: React.ReactNode;
  showLoadButton?: boolean;
  className?: string;
  eventScheduleInfo: EventScheduleInfoType;
  mode: "my" | "common";
}

const ScheduleSection = ({
  title,
  showLoadButton = false,
  className = "",
  eventScheduleInfo,
  mode,
}: ScheduleSectionProps) => {
  const [mySchedule, setMySchedule] = useState<MyScheduleType | null>(null);

  const handleLoadMySchedule = async () => {
    try {
      const { data } = await getMySchedule();
      if (!data) {
        throw new Error("내 시간표 조회 실패");
      }
      setMySchedule(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={`flex flex-col gap-6 w-full ${className}`}>
        <div className="flex justify-between items-center">
          <div className="text-[color:var(--color-black)] font-semibold text-xl">
            {title}
          </div>
          {showLoadButton && (
            <LoadButton handleLoadMySchedule={handleLoadMySchedule} />
          )}
        </div>
        <div className="flex justify-center w-full">
          {mode === "my" ? (
            <Schedule
              eventScheduleInfo={eventScheduleInfo.timeTable}
              mySchedule={mySchedule}
            />
          ) : (
            <CommonSchedule eventScheduleInfo={eventScheduleInfo} />
          )}
        </div>
      </div>
    </>
  );
};

export default ScheduleSection;

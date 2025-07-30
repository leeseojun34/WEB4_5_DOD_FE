"use client";

import CommonSchedule from "@/components/feature/CommonSchedule";
import LoadButton from "./LoadButton";
import React, { useEffect, useState } from "react";
import Schedule from "@/components/feature/Schedule";
import { getMySchedule } from "@/lib/api/scheduleApi";
import useAuthStore from "@/stores/authStores";
import Toast from "@/components/ui/Toast";
import { useRouter } from "next/navigation";

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
  const [timeSlots, setTimeSlots] =
    useState<{ date: string; timeBit: string }[]>();
  const { user } = useAuthStore();
  const router = useRouter();
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

  useEffect(() => {
    if (user) {
      for (const member of eventScheduleInfo.memberSchedules) {
        if (member.eventMemberId === user.id) {
          setTimeSlots(member.dailyTimeSlots);
          break;
        }
      }
    } else {
      Toast("로그인 후 이용해주세요.");
      router.push("/");
    }
  }, [user, eventScheduleInfo]);

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
              timeSlots={timeSlots}
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

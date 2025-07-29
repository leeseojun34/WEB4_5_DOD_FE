"use client";

import { useEffect, useState } from "react";
import ScheduleInfo from "@/components/feature/schedule/ScheduleInfo";
import ScheduleButton from "@/components/ui/ScheduleButton";
import ScheduleRabbit from "@/components/ui/ScheduleRabbit";
import ScheduleSelectDate from "@/components/feature/schedule/ScheduleSelectDate";
import ScheduleSelectMode from "@/components/feature/schedule/ScheduleSelectMode";
import { ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDate } from "@/app/utils/dateFormat";
import { createEvent } from "@/lib/api/scheduleApi";
import useAuthStore from "@/stores/authStores";
import Toast from "@/components/ui/Toast";
import { AxiosError } from "axios";

const CreateSchedule = () => {
  const { user } = useAuthStore.getState();
  const router = useRouter();
  const [level, setLevel] = useState(0);
  const groupId = useSearchParams().get("groupId");
  const [isMounted, setIsMounted] = useState(false);
  const [schedule, setSchedule] = useState<EventType>({
    title: "",
    description: "",
    meetingType: "ONLINE",
    maxMember: 0,
    groupId: groupId ?? null,
    dateList: [
      {
        dates: [],
        startTime: "09:00",
        endTime: "18:00",
      },
    ],
  });

  const [dateList, setDateList] = useState<Date[]>([]);
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("18:00");

  const handleBack = () => {
    if (level === 0) {
      router.back();
    } else {
      setLevel((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!user && isMounted) {
      Toast("로그인 후 이용해주세요.");
      router.push("/auth/login");
    }
  }, [isMounted, user]);

  if (!user || !isMounted) return null;

  const handleCreateSchedule = async () => {
    // 이벤트 등록 api 호출
    const formattedDateList = dateList.map((date) => formatDate(date));
    const newSchedule = {
      ...schedule,
      dateList: [
        {
          dates: formattedDateList,
          startTime: startTime,
          endTime: endTime,
        },
      ],
    };

    try {
      const response = await createEvent(newSchedule);
      if (response.code === "200") {
        if (response.data.eventId) {
          router.push(
            `/schedule/complete/${response.data.eventId}${
              groupId ? `?group=true` : ""
            }`
          );
        } else {
          throw new Error(response.message);
        }
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        Toast(error.response?.data.message);
      } else {
        Toast("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-between px-5 pt-11 md:pt-20 min-h-7 bg-transparent z-10">
        <span onClick={handleBack} className="cursor-pointer">
          <ChevronLeft size={20} className="text-[var(--color-black)]" />
        </span>
      </div>
      <div className="flex flex-col flex-1">
        <ScheduleRabbit level={level} />
        {level === 0 && (
          <ScheduleInfo schedule={schedule} setSchedule={setSchedule} />
        )}
        {level === 1 && (
          <ScheduleSelectDate
            dateList={dateList}
            setDateList={setDateList}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
          />
        )}
        {level === 2 && (
          <ScheduleSelectMode schedule={schedule} setSchedule={setSchedule} />
        )}
      </div>
      <ScheduleButton
        level={level}
        setLevel={setLevel}
        schedule={schedule}
        dateList={dateList}
        startTime={startTime}
        endTime={endTime}
        handleCreateSchedule={handleCreateSchedule}
      />
    </>
  );
};
export default CreateSchedule;

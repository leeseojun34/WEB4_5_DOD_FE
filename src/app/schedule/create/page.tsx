"use client";

import { useState } from "react";
import ScheduleInfo from "@/components/feature/schedule/ScheduleInfo";
import ScheduleButton from "@/components/ui/ScheduleButton";
import ScheduleRabbit from "@/components/ui/ScheduleRabbit";
import ScheduleSelectDate from "@/components/feature/schedule/ScheduleSelectDate";
import ScheduleSelectMode from "@/components/feature/schedule/ScheduleSelectMode";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const CreateSchedule = () => {
  const router = useRouter();
  const [level, setLevel] = useState(0);

  const [schedule, setSchedule] = useState<ScheduleType>({
    title: "",
    description: "",
    meetingType: "ONLINE",
    maxMember: 0,
    groupId: null,
    dateList: [
      {
        dates: [],
        startTime: "",
        endTime: "",
      },
    ],
  });

  const [dateList, setDateList] = useState<Date[]>([]);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const handleBack = () => {
    if (level === 0) {
      router.back();
    } else {
      setLevel((prev) => prev - 1);
    }
  };

  const handleCreateSchedule = () => {
    // 이벤트 등록 api 호출
    console.log(schedule);
    console.log(dateList);
    console.log(startTime);
    console.log(endTime);
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

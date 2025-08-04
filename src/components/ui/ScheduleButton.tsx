"use client";

import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import Toast from "./Toast";

const ScheduleButton = ({
  level,
  setLevel,
  schedule,
  dateList,
  startTime,
  endTime,
  handleCreateSchedule,
}: {
  level: number;
  setLevel: (level: number) => void;
  schedule: EventType;
  dateList: Date[];
  startTime: string;
  endTime: string;
  handleCreateSchedule: () => void;
}) => {
  const [buttonText, setButtonText] = useState("다음");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClick = () => {
    if (level === 2) {
      handleCreateSchedule();
    } else {
      const startTimeHour = parseInt(startTime.split(":")[0]);
      const endTimeHour = parseInt(endTime.split(":")[0]);

      if (startTimeHour === endTimeHour) {
        Toast("시작 시간과 종료 시간이 같을 수 없어요..");
        setIsDisabled(true);
        return;
      } else if (startTimeHour >= endTimeHour) {
        Toast("시작 시간이 종료 시간보다 늦을 수 없어요..");
        setIsDisabled(true);
        return;
      }

      setLevel(level + 1);
    }
    setIsDisabled(true);
  };

  useEffect(() => {
    if (level === 0) {
      if (schedule.title === "" || schedule.description === "")
        setIsDisabled(true);
      else setIsDisabled(false);

      setButtonText("다음");
    } else if (level === 1) {
      if (dateList.length === 0 || startTime === "" || endTime === "")
        setIsDisabled(true);
      else setIsDisabled(false);

      setButtonText("다음");
    } else if (level === 2) {
      if (schedule.maxMember === 0 || schedule.meetingType === null)
        setIsDisabled(true);
      else setIsDisabled(false);

      setButtonText("일정 생성");
    }
  }, [level, schedule, dateList, startTime, endTime]);

  return (
    <div className="my-8 mx-5 flex justify-center items-center">
      <Button onClick={handleClick} state={isDisabled ? "disabled" : "default"}>
        {buttonText}
      </Button>
    </div>
  );
};
export default ScheduleButton;

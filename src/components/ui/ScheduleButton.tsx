"use client";

import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  schedule: ScheduleType;
  dateList: Date[];
  startTime: string;
  endTime: string;
  handleCreateSchedule: () => void;
}) => {
  const [buttonText, setButtonText] = useState("다음");
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();

  const handleClick = () => {
    if (level === 2) {
      handleCreateSchedule();
      // router.push("/schedule/complete");
    } else {
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

"use client";

import { useState } from "react";
import ScheduleInfo from "@/components/feature/schedule/ScheduleInfo";
import ScheduleButton from "@/components/ui/ScheduleButton";
import ScheduleRabbit from "@/components/ui/ScheduleRabbit";
import ScheduleSelectDate from "@/components/feature/schedule/ScheduleSelectDate";

// TODO: 레벨 증가 시 레벨 증가 애니메이션 추가
// 데이터 연결 작업
const CreateSchedule = () => {
  const [level, setLevel] = useState(0);

  return (
    <>
      <div className="flex flex-col flex-1">
        <ScheduleRabbit level={level} />
        {level === 0 && <ScheduleInfo />}
        {level === 1 && <ScheduleSelectDate />}
      </div>
      <ScheduleButton level={level} setLevel={setLevel} />
    </>
  );
};
export default CreateSchedule;

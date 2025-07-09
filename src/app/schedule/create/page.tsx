"use client";

import { useState } from "react";
import ScheduleInfo from "@/components/feature/schedule/ScheduleInfo";
import ScheduleButton from "@/components/ui/ScheduleButton";

const CreateSchedule = () => {
  const [level, setLevel] = useState(0);

  return (
    <>
      <div className="flex flex-col flex-1">
        <ScheduleInfo level={level} />
      </div>
      <ScheduleButton level={level} setLevel={setLevel} />
    </>
  );
};
export default CreateSchedule;

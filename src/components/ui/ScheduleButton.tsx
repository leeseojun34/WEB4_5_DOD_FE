"use client";

import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";

const ScheduleButton = ({
  level,
  setLevel,
}: {
  level: number;
  setLevel: (level: number) => void;
}) => {
  const [buttonText, setButtonText] = useState("다음");

  useEffect(() => {
    if (level === 2) {
      setButtonText("일정 생성");
    }
  }, [level]);

  return (
    <div className="my-8 mx-5 flex justify-center items-center">
      <Button onClick={() => setLevel(level + 1)}>{buttonText}</Button>
    </div>
  );
};
export default ScheduleButton;

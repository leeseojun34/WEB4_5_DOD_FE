"use client";

import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ScheduleButton = ({
  level,
  setLevel,
}: {
  level: number;
  setLevel: (level: number) => void;
}) => {
  const [buttonText, setButtonText] = useState("다음");
  const router = useRouter();

  const handleClick = () => {
    if (level === 2) {
      router.push("/schedule/complete");
    } else {
      setLevel(level + 1);
    }
  };

  useEffect(() => {
    if (level === 2) {
      setButtonText("일정 생성");
    } else {
      setButtonText("다음");
    }
  }, [level]);

  return (
    <div className="my-8 mx-5 flex justify-center items-center">
      <Button onClick={handleClick}>{buttonText}</Button>
    </div>
  );
};
export default ScheduleButton;

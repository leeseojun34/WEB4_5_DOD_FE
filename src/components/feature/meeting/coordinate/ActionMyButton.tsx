"use client";

import { Button } from "@/components/ui/Button";
import { useRouter, useParams } from "next/navigation";
import { setEventMyTime } from "@/lib/api/scheduleApi";
import Toast from "@/components/ui/Toast";
import { useState } from "react";

const ActionMyButton = () => {
  const router = useRouter();
  const { eventId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const myScheduleRegistration = async () => {
    try {
      setIsLoading(true);
      await setEventMyTime(Number(eventId));
      router.push(`/meeting/${eventId}/coordinate`);
    } catch (error) {
      Toast("내 시간표 등록에 실패했습니다.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed w-full left-0 right-0 px-5 bottom-9">
      <div className="max-w-185 mx-auto">
        <Button
          onClick={myScheduleRegistration}
          state={isLoading ? "disabled" : "default"}
        >
          {isLoading ? "등록 중..." : "내 시간표 등록"}
        </Button>
      </div>
    </div>
  );
};

export default ActionMyButton;

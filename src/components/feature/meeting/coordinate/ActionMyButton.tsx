"use client";

import { Button } from "@/components/ui/Button";
import { useRouter, useParams } from "next/navigation";
import { setEventMyTime } from "@/lib/api/scheduleApi";
import Toast from "@/components/ui/Toast";

const ActionMyButton = () => {
  const router = useRouter();
  const { eventId } = useParams();
  const myScheduleRegistration = async () => {
    try {
      await setEventMyTime(Number(eventId));
      router.push(`/meeting/${eventId}/coordinate`);
    } catch (error) {
      Toast("내 시간표 등록에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div className="flex gap-5 w-full">
      <Button onClick={myScheduleRegistration}>내 시간표 등록</Button>
    </div>
  );
};

export default ActionMyButton;

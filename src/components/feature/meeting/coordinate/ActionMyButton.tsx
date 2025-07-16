"use client";

import { Button } from "@/components/ui/Button";
import { useRouter, useParams } from "next/navigation";

const ActionMyButton = () => {
  const router = useRouter();
  const { eventId } = useParams();
  const myScheduleRegistration = async () => {
    // TODO: 내 시간표 등록 기능 추가
    router.push(`/meeting/${eventId}/coordinate`);
  };

  return (
    <div className="flex gap-5 w-full">
      <Button onClick={myScheduleRegistration}>내 시간표 등록</Button>
    </div>
  );
};

export default ActionMyButton;

"use client";

import { Button } from "@/components/ui/Button";
import { useRouter, useParams } from "next/navigation";

interface ActionButtonsProps {
  className?: string;
  isConfirmed: boolean;
}

const ActionButtons = ({ className = "", isConfirmed }: ActionButtonsProps) => {
  const router = useRouter();
  const { eventId } = useParams();
  // TODO:내 시간표 btn 색 변경
  const myScheduleNavigate = () => {
    router.push(`/meeting/${eventId}/coordinate/my`);
  };
  const navigate = () => {
    router.push(`/meeting/${eventId}/coordinate/timeresult`);
  };
  return (
    <div className={`flex gap-5 w-full ${className}`}>
      <Button
        onClick={myScheduleNavigate}
        state={isConfirmed ? "disabled" : "default"}
      >
        내 시간표 입력
      </Button>
      <Button onClick={navigate}>결과 보기</Button>
    </div>
  );
};

export default ActionButtons;

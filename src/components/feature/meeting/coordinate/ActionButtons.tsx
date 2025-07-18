"use client";

import { Button } from "@/components/ui/Button";
import { useRouter, useParams } from "next/navigation";
import Toast from "@/components/ui/Toast";
import { setScheduleResult } from "@/lib/api/scheduleApi";

interface ActionButtonsProps {
  className?: string;
  isConfirmed: boolean;
  complete: boolean;
}

const ActionButtons = ({
  className = "",
  isConfirmed,
  complete,
}: ActionButtonsProps) => {
  const router = useRouter();
  const { eventId } = useParams();
  const myScheduleNavigate = () => {
    router.push(`/meeting/${eventId}/coordinate/my`);
  };
  const scheduleResultNavigate = async () => {
    if (complete) {
      try {
        await setScheduleResult(Number(eventId));
        router.push(`/meeting/${eventId}/coordinate/timeresult`);
      } catch {
        Toast("결과 확인에 실패했습니다.");
        return;
      }
    } else {
      Toast("모든 구성원이 시간표를 입력해야 결과를 확인할 수 있어요.");
      return;
    }
  };

  return (
    <div className={`flex gap-5 w-full ${className}`}>
      <Button
        onClick={myScheduleNavigate}
        state={isConfirmed ? "disabled" : "default"}
      >
        내 시간표 입력
      </Button>
      <Button onClick={scheduleResultNavigate}>결과 보기</Button>
    </div>
  );
};

export default ActionButtons;

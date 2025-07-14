"use client";

import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

interface ActionButtonsProps {
  className?: string;
}

const ActionButtons = ({ className = "" }: ActionButtonsProps) => {
  const router = useRouter();
  const navigate = () => {
    router.push("/meeting/coordinate/timeresult");
  };
  return (
    <div className={`flex gap-5 w-full ${className}`}>
      <Button state="disabled">내 시간표 확정</Button>
      <Button onClick={navigate}>결과 보기</Button>
    </div>
  );
};

export default ActionButtons;

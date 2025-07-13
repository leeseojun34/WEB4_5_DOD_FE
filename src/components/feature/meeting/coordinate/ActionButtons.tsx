import { Button } from "@/components/ui/Button";

interface ActionButtonsProps {
  className?: string;
}

const ActionButtons = ({ className = "" }: ActionButtonsProps) => {
  return (
    <div className={`flex gap-5 w-full ${className}`}>
      <Button>내 시간표 확정</Button>
      <Button state="disabled">결과 보기</Button>
    </div>
  );
};

export default ActionButtons;

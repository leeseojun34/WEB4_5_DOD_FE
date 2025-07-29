import { Button } from "@/components/ui/Button";
import ControlledAlertBox from "@/components/ui/ControlledAlertBox";
import { useState } from "react";

interface ActionButtonsProps {
  onDelete: () => void;
  onEditComplete: () => void;
  scheduleName: string;
  scheduleDescription: string;
}

const ActionButtons = ({
  onDelete,
  onEditComplete,
  scheduleName,
  scheduleDescription,
}: ActionButtonsProps) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  return (
    <div className="w-full justify-center flex flex-col gap-5 absolute bottom-9 left-0 right-0 items-center px-5">
      <button
        className="text-xs text-[color:var(--color-gray-placeholder)] hover:text-[color:var(--color-red)] text-center"
        onClick={() => setIsAlertOpen(true)}
      >
        모임 삭제하기
      </button>
      <Button
        state={!scheduleName || !scheduleDescription ? "disabled" : "default"}
        onClick={onEditComplete}
      >
        수정 완료
      </Button>
      <ControlledAlertBox
        content={"정말 삭제하시겠습니까?"}
        cancel="취소"
        action="확인"
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        actionHandler={() => onDelete()}
      />
    </div>
  );
};

export default ActionButtons;

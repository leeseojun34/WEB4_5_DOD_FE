import Input from "@/components/ui/Input";
import Dropdown from "@/components/ui/Dropdown";
import { ChangeEvent } from "react";

interface ScheduleFormProps {
  scheduleName: string;
  scheduleDescription: string;
  scheduleTime: string;
  onScheduleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onScheduleDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onTimeClick: () => void;
}

const ScheduleForm = ({
  scheduleName,
  scheduleDescription,
  scheduleTime,
  onScheduleNameChange,
  onScheduleDescriptionChange,
  onTimeClick,
}: ScheduleFormProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Input
        label="모임 이름"
        error="10글자를 이내로 작성해주세요"
        maxLength={15}
        placeholder="모임 이름을 입력해주세요"
        value={scheduleName}
        onChange={onScheduleNameChange}
      />
      <Input
        label="모임 설명"
        error="50글자를 이내로 작성해주세요"
        maxLength={50}
        isTextarea={true}
        placeholder="모임 설명을 입력해주세요"
        value={scheduleDescription}
        onChange={onScheduleDescriptionChange}
      />
      <Dropdown label="온/오프라인" options={["온라인", "오프라인"]} />
      <Input
        label="모임 시간"
        value={scheduleTime}
        onClick={onTimeClick}
        icon={
          <button className="w-7 font-medium text-sm text-[color:var(--color-gray-placeholder)]]">
            수정
          </button>
        }
        readOnly
      />
    </div>
  );
};

export default ScheduleForm;

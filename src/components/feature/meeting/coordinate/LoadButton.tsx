import { TbCalendarDown } from "react-icons/tb";
import AlertBox from "@/components/ui/AlertBox";
const LoadButton = ({
  handleLoadMySchedule,
}: {
  handleLoadMySchedule: () => void;
}) => {
  return (
    <AlertBox
      title="내 시간표 불러오기"
      content={`내 시간표를 불러오시겠습니까?
          불러온 내용은 즉시 적용되며,
          이미 선택된 칸과 겹치면 해제됩니다.`}
      cancel="취소"
      action="불러오기"
      actionHandler={handleLoadMySchedule}
    >
      <div className="flex items-center gap-1 cursor-pointer">
        <div className="text-[color:var(--color-gray-placeholder)] text-xs">
          불러오기
        </div>
        <TbCalendarDown className="w-[10px] h-[10px] text-[color:var(--color-gray-placeholder)]" />
      </div>
    </AlertBox>
  );
};

export default LoadButton;

import ScheduleTitleText from "@/components/ui/ScheduleTitle";
import ScheduleModeList from "./ScheduleModeList";

const ScheduleSelectMode = ({
  schedule,
  setSchedule,
}: {
  schedule: EventType;
  setSchedule: (schedule: EventType) => void;
}) => {
  return (
    <>
      <div className="flex flex-col flex-1 gap-8">
        <div className="flex flex-col gap-4 mt-10">
          <ScheduleTitleText title="참여 인원 수와 모임 방식을 선택해주세요" />
        </div>
        <ScheduleModeList schedule={schedule} setSchedule={setSchedule} />
      </div>
    </>
  );
};
export default ScheduleSelectMode;

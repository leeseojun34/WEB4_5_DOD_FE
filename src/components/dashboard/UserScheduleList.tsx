import { DashboardScheduleType } from "@/lib/api/dashboardApi";
import ScheduleCard from "../ui/ScheduleCard";
import { formatSchedule } from "@/app/utils/dateFormat";
import { OptionBox } from "../ui/OptionBox";
import NameTag from "../ui/NameTag";
import { useState } from "react";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import { moveSchedule } from "@/lib/api/groupApi";
interface UserScheduleListProps {
  schedules: DashboardScheduleType[];
  groupId?: number;
}

const UserScheduleList = ({ schedules, groupId }: UserScheduleListProps) => {
  const [selectedSchedule, setSelectedSchedule] = useState<number | null>(null);
  const groupMembers = ["박은서", "현혜주", "황수지", "박준규", "박상윤"];
  const router = useRouter();

  const handleMoveSchedule = async (scheduleId: number, groupId: number) => {
    try {
      const response = await moveSchedule(scheduleId, groupId);
      if (response.code === "200") {
        router.push(`/group/${groupId}`);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {schedules.map((schedule) => (
        <div key={schedule.id} className="w-full">
          {!groupId ? (
            <ScheduleCard
              variant="event"
              title={schedule.name}
              meetingType={
                schedule.meetingType === "ONLINE" ? "온라인" : "오프라인"
              }
              time={formatSchedule(schedule.startTime, schedule.endTime)}
              members={groupMembers}
            />
          ) : (
            <OptionBox isSelected={schedule.id === selectedSchedule}>
              <div
                className=" flex flex-col flex-1 gap-2 min-w-[335px] max-w-185 w-full px-2"
                onClick={() => setSelectedSchedule(schedule.id)}
              >
                <div className="flex justify-between">
                  <div className="flex gap-3">
                    <p className="text-[color:var(--color-gray)] text-xs">
                      {schedule.name}
                    </p>
                    <p className="text-[color:var(--color-primary-400)] text-xs font-regular">
                      {schedule.meetingType === "ONLINE"
                        ? "온라인"
                        : "오프라인"}
                    </p>
                  </div>
                </div>
                <div className="text-sm font-medium text-[color:var(--color-black)]">
                  {formatSchedule(schedule.startTime, schedule.endTime)}
                </div>
                <div className="flex gap-1">
                  {groupMembers.map((member, i) => (
                    <NameTag name={member} key={`${member}-${i}`} />
                  ))}
                </div>
              </div>
            </OptionBox>
          )}
        </div>
      ))}
      {groupId && (
        <div className="fixed w-full left-0 right-0 px-5 bottom-9">
          <div className="max-w-185 mx-auto">
            <div className="w-full flex justify-center">
              <Button
                onClick={() => {
                  if (selectedSchedule)
                    handleMoveSchedule(selectedSchedule, groupId);
                }}
                state={selectedSchedule ? "default" : "disabled"}
              >
                그룹 일정으로 불러오기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserScheduleList;

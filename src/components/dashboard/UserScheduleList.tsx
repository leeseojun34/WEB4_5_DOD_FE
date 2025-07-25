import { DashboardScheduleType } from "@/lib/api/dashboardApi";
import ScheduleCard from "../ui/ScheduleCard";
import { formatSchedule } from "@/app/utils/dateFormat";
import { OptionBox } from "../ui/OptionBox";
import NameTag from "../ui/NameTag";
import { useState } from "react";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import { moveSchedule } from "@/lib/api/groupApi";
import { OptionBoxSkeleton, ScheduleCardSkeleton } from "./Skeleton";
import { motion } from "framer-motion";
import {
  listVariants,
  itemVariants,
} from "@/components/feature/schedule/motion";

interface UserScheduleListProps {
  schedules: DashboardScheduleType[];
  groupId?: number;
  isLoading: boolean;
}

const UserScheduleList = ({
  schedules,
  groupId,
  isLoading,
}: UserScheduleListProps) => {
  const [selectedSchedule, setSelectedSchedule] = useState<number | null>(null);
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

  const renderSkeletons = () => {
    return Array.from({ length: 3 }).map((_, i) =>
      groupId ? <OptionBoxSkeleton key={i} /> : <ScheduleCardSkeleton key={i} />
    );
  };

  const handleCustomDelete = (scheduleId: string) => {
    console.log("사용자 리스트에서 일정 제거", scheduleId);
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-4 w-full"
      variants={listVariants}
      initial="hidden"
      animate="visible"
    >
      {isLoading
        ? renderSkeletons()
        : schedules.map((schedule) => (
            <motion.div
              key={schedule.id}
              className="w-full"
              variants={itemVariants}
            >
              {!groupId ? (
                <ScheduleCard
                  variant="event"
                  title={schedule.name}
                  meetingType={schedule.meetingType as "ONLINE" | "OFFLINE"}
                  time={formatSchedule(schedule.startTime, schedule.endTime)}
                  members={schedule.participantNames.split(", ")}
                  scheduleId={String(schedule.id)}
                  groupRole={true}
                  onCustomDelete={handleCustomDelete}
                />
              ) : (
                <OptionBox isSelected={schedule.id === selectedSchedule}>
                  <div
                    className=" flex flex-col flex-1 gap-2 min-w-[335px] max-w-185 w-full px-4"
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
                      {schedule.participantNames
                        .split(", ")
                        .map((member, i) => (
                          <NameTag name={member} key={`${member}-${i}`} />
                        ))}
                    </div>
                  </div>
                </OptionBox>
              )}
            </motion.div>
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
    </motion.div>
  );
};
export default UserScheduleList;

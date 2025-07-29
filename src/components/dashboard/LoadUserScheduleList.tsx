import { DashboardScheduleType } from "@/lib/api/dashboardApi";
import { formatSchedule } from "@/app/utils/dateFormat";
import { OptionBox } from "../ui/OptionBox";
import NameTag from "../ui/NameTag";
import { useState } from "react";
import { Button } from "../ui/Button";
import { useLoadPersonalSchedule } from "@/lib/api/groupApi";
import { motion } from "framer-motion";
import {
  listVariants,
  itemVariants,
} from "@/components/feature/schedule/motion";

interface UserScheduleListProps {
  schedules: DashboardScheduleType[];
  groupId?: number;
}

const LoadUserScheduleList = ({
  schedules,
  groupId,
}: UserScheduleListProps) => {
  const [selectedSchedule, setSelectedSchedule] = useState<number | null>(null);

  const moveScheduleMutation = useLoadPersonalSchedule();

  const handleMoveSchedule = async (scheduleId: number, groupId: number) => {
    moveScheduleMutation.mutate({
      scheduleId,
      groupId,
    });
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-4 w-full"
      variants={listVariants}
      initial="hidden"
      animate="visible"
    >
      {schedules.map((schedule) => (
        <motion.div
          key={schedule.id}
          className="w-full"
          variants={itemVariants}
        >
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
                    {schedule.meetingType === "ONLINE" ? "온라인" : "오프라인"}
                  </p>
                </div>
              </div>
              <div className="text-sm font-medium text-[color:var(--color-black)]">
                {formatSchedule(schedule.startTime, schedule.endTime)}
              </div>
              <div className="flex gap-1">
                {schedule.participantNames.split(", ").map((member, i) => (
                  <NameTag
                    name={member}
                    key={`${member}-${i}`}
                    isFuture={true}
                  />
                ))}
              </div>
            </div>
          </OptionBox>
        </motion.div>
      ))}

      <div className="fixed w-full left-0 right-0 px-5 bottom-9">
        <div className="max-w-185 mx-auto">
          <div className="w-full flex justify-center">
            <Button
              onClick={() => {
                if (selectedSchedule)
                  handleMoveSchedule(selectedSchedule, groupId!);
              }}
              state={selectedSchedule ? "default" : "disabled"}
            >
              그룹 일정으로 불러오기
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default LoadUserScheduleList;

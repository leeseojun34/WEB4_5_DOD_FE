import {
  DashboardScheduleType,
  deactivatedSchedule,
} from "@/lib/api/dashboardApi";
import ScheduleCard from "../ui/ScheduleCard";
import { formatSchedule, splitByDate } from "@/app/utils/dateFormat";
import { motion } from "framer-motion";
import {
  listVariants,
  itemVariants,
} from "@/components/feature/schedule/motion";
import { useQueryClient } from "@tanstack/react-query";
import Toast from "../ui/Toast";
import ToastWell from "../ui/ToastWell";

interface UserScheduleListProps {
  schedules: DashboardScheduleType[];
}

const UserScheduleList = ({ schedules }: UserScheduleListProps) => {
  const { past, future } = splitByDate(schedules);
  const queryClient = useQueryClient();

  const handleCustomDelete = async (scheduleMemberId: number) => {
    try {
      const response = await deactivatedSchedule(scheduleMemberId);
      if (response.code === "200") {
        queryClient.invalidateQueries({
          queryKey: ["userSchedules"],
        });
        ToastWell("🗑️", "일정을 성공적으로 삭제했습니다");
      }
    } catch {
      Toast("일정 삭제에 실패했습니다");
      return;
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-4 w-full"
      variants={listVariants}
      initial="hidden"
      animate="visible"
    >
      {future.map((schedule) => (
        <motion.div
          key={schedule.id}
          className="w-full"
          variants={itemVariants}
        >
          <ScheduleCard
            variant="event"
            title={schedule.name}
            meetingType={schedule.meetingType as "ONLINE" | "OFFLINE"}
            time={formatSchedule(schedule.startTime, schedule.endTime)}
            members={schedule.participantNames.split(", ")}
            scheduleId={String(schedule.id)}
            groupRole={true}
            scheduleMemberId={schedule.scheduleMemberId}
            onCustomDelete={handleCustomDelete}
          />
        </motion.div>
      ))}
      {past.map((schedule) => (
        <motion.div
          key={schedule.id}
          className="w-full"
          variants={itemVariants}
        >
          <ScheduleCard
            variant="event"
            title={schedule.name}
            meetingType={schedule.meetingType as "ONLINE" | "OFFLINE"}
            time={formatSchedule(schedule.startTime, schedule.endTime)}
            members={schedule.participantNames.split(", ")}
            scheduleId={String(schedule.id)}
            scheduleMemberId={schedule.scheduleMemberId}
            groupRole={true}
            onCustomDelete={handleCustomDelete}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
export default UserScheduleList;

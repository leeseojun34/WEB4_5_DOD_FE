import { DashboardScheduleType } from "@/lib/api/dashboardApi";
import ScheduleCard from "../ui/ScheduleCard";
import { formatSchedule, splitByDate } from "@/app/utils/dateFormat";
import { motion } from "framer-motion";
import {
  listVariants,
  itemVariants,
} from "@/components/feature/schedule/motion";

interface UserScheduleListProps {
  schedules: DashboardScheduleType[];
}

const UserScheduleList = ({ schedules }: UserScheduleListProps) => {
  const { past, future } = splitByDate(schedules);

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
            groupRole={true}
            onCustomDelete={handleCustomDelete}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
export default UserScheduleList;

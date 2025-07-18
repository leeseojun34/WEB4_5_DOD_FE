import { DashboardScheduleType } from "@/lib/api/dashboardApi";
import ScheduleCard from "../ui/ScheduleCard";
import { formatSchedule } from "@/app/utils/dateFormat";

interface UserScheduleListProps {
  schedules: DashboardScheduleType[];
}

const UserScheduleList = ({ schedules }: UserScheduleListProps) => {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {schedules.map((schedule) => (
        <div key={schedule.id} className="w-full">
          <ScheduleCard
            variant="event"
            title={schedule.name}
            meetingType={
              schedule.meetingType === "ONLINE" ? "온라인" : "오프라인"
            }
            time={formatSchedule(schedule.startTime, schedule.endTime)}
            members={["박은서", "현혜주", "황수지", "박준규", "박상윤"]}
          />
        </div>
      ))}
    </div>
  );
};
export default UserScheduleList;

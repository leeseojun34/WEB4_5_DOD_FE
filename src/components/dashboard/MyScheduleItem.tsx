import { formatScheduleTimeOnly } from "@/app/utils/dateFormat";
import { DashboardScheduleType } from "@/lib/api/dashboardApi";
import { AtSign, MapPin } from "lucide-react";
import Image from "next/image";
import googleCalendarIcon from "@/assets/icon/google_calender_icon.svg";

interface MyScheduleItemProps {
  schedule: DashboardScheduleType;
}
export const MyScheduleItem = ({ schedule }: MyScheduleItemProps) => {
  return (
    <>
      <div className="flex gap-5 w-full items-center">
        <div className="flex items-center justify-center w-18 h-[50px] bg-[color:var(--color-gray-background)] text-[color:var(--color-primary-400)] rounded-lg text-xs">
          D-DAY
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-[color:var(--color-black)] text-sm font-semibold w-[150px] sm:w-[320px] truncate">
            {schedule.name}
          </div>
          <div className="text-[color:var(--color-gray)] font-regular text-xs">
            {formatScheduleTimeOnly(schedule.startTime, schedule.endTime)}
          </div>
          <div className="flex items-center gap-1">
            {schedule.source === "SERVICE" ? (
              <>
                {schedule.meetingType === "OFFLINE" ? (
                  <>
                    <MapPin className="w-3 h-[14px] text-[color:var(--color-gray-placeholder)]" />
                    <p className="text-xs text-[color:var(--color-gray-placeholder)]">
                      {schedule.location || "미정"}
                    </p>
                  </>
                ) : (
                  <>
                    <AtSign className="w-3 h-[14px] text-[color:var(--color-gray-placeholder)]" />
                    <p className="text-xs text-[color:var(--color-gray-placeholder)]">
                      {schedule.meetingPlatform || "미정"}
                    </p>
                  </>
                )}
              </>
            ) : (
              <>
                <Image
                  src={googleCalendarIcon}
                  alt="구글 캘린더"
                  width={16}
                  height={16}
                />
                <p className="text-xs text-[color:var(--color-gray-placeholder)]">
                  Google Calendar
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

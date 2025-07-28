"use client";

import ScheduleCard from "@/components/ui/ScheduleCard";
import { formatSchedule } from "@/app/utils/dateFormat";
import { useEffect, useState } from "react";

const TimeResultScheduleCard = ({
  list,
  totalParticipants,
  handleCreateSchedule,
}: {
  list: MeetingTimeType[];
  totalParticipants: number;
  handleCreateSchedule: (data: string) => void;
}) => {
  const [scheduleList, setScheduleList] = useState<
    {
      key: string;
      time: string;
      members: string[];
    }[]
  >([]);

  useEffect(() => {
    const result = list.map((item) => {
      return {
        key: item.timeSlotId,
        time: formatSchedule(item.startTime, item.endTime),
        members: item.participants.map((participant) => participant.memberName),
      };
    });

    setScheduleList(result);
  }, [list]);

  return (
    <div className="flex flex-col gap-4">
      {scheduleList.map((item) => (
        <div key={item.key} onClick={() => handleCreateSchedule(item.key)}>
          <ScheduleCard
            variant="attendance"
            totalCount={totalParticipants}
            members={item.members}
            time={item.time}
          />
        </div>
      ))}
    </div>
  );
};
export default TimeResultScheduleCard;

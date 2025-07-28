"use client";

import ScheduleCard from "@/components/ui/ScheduleCard";
import { formatSchedule } from "@/app/utils/dateFormat";
import { useEffect, useState } from "react";
import { listVariants, itemVariants } from "../schedule/motion";
import { motion } from "framer-motion";

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
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4"
    >
      {scheduleList.map((item) => (
        <motion.div
          key={item.key}
          variants={itemVariants}
          onClick={() => handleCreateSchedule(item.key)}
        >
          <ScheduleCard
            variant="attendance"
            totalCount={totalParticipants}
            members={item.members}
            time={item.time}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
export default TimeResultScheduleCard;

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getGroupMembers, getGroupStatistics } from "@/lib/api/groupApi";
import { getGroupSchedule } from "@/lib/api/scheduleApi";

interface Schedule {
  scheduleName: string;
  meetingType: "ONLINE" | "OFFLINE";
  time: string;
  startTime: string;
  endTime: string;
  memberNames: string[];
  scheduleId: string;
}

export const usePrefetchGroupData = (
  groupId: string,
  schedules: Schedule[]
) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!groupId) return;

    queryClient.prefetchQuery({
      queryKey: ["groupStatics", groupId],
      queryFn: () => getGroupStatistics(groupId),
    });

    queryClient.prefetchQuery({
      queryKey: ["groupMembers", groupId],
      queryFn: () => getGroupMembers(groupId),
    });
    if (schedules) {
      schedules.forEach((schedule) => {
        queryClient.prefetchQuery({
          queryKey: ["groupSchedule", schedule.scheduleId],
          queryFn: () => getGroupSchedule(schedule.scheduleId),
        });
      });
    }
  }, [groupId, queryClient, schedules]);
};

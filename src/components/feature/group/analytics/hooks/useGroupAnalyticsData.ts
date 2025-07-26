import { useGroupStatistics } from "@/lib/api/groupApi";
import { useParams } from "next/navigation";
import {
  getLocationFrequencies,
  mapWeekdayData,
} from "@/app/utils/analyticsUtils";

interface GroupUserDetails {
  scheduleNums: number;
  userName: string;
}

export const useGroupAnalyticsData = () => {
  const params = useParams();
  const groupId = params.groupId as string;
  const { data, isPending } = useGroupStatistics(groupId);

  const analyticsData = data?.data;
  const totalScheduleNum = analyticsData?.scheduleNumber ?? 0;

  const memberParticipationData = analyticsData?.groupUserDetails?.sort(
    (a: GroupUserDetails, b: GroupUserDetails) =>
      b.scheduleNums - a.scheduleNums
  );

  const weekdayData = mapWeekdayData(analyticsData?.weekDetails || []);
  const { locations, counts } = getLocationFrequencies(
    analyticsData?.groupSchedules || []
  );

  return {
    groupId,
    isPending,
    totalScheduleNum,
    memberParticipationData,
    weekdayData,
    locations,
    counts,
    hasNoData: totalScheduleNum === 0,
  };
};

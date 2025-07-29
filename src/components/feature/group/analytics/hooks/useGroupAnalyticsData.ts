import { useGroupStatistics } from "@/lib/api/groupApi";
import { useParams, useRouter } from "next/navigation";
import {
  getLocationFrequencies,
  mapWeekdayData,
} from "@/app/utils/analyticsUtils";
import useAuthStore from "@/stores/authStores";
import { useEffect } from "react";
import Toast from "@/components/ui/Toast";

interface GroupUserDetails {
  scheduleNums: number;
  userName: string;
}

export const useGroupAnalyticsData = () => {
  const params = useParams();
  const groupId = params.groupId as string;
  const user = useAuthStore((state) => state.user);
  const { data, isPending } = useGroupStatistics(groupId);
  const route = useRouter();

  useEffect(() => {
    if (!user) route.push("/auth/login");
    Toast("로그인 후 이용해주세요")
  }, [user, route]);

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

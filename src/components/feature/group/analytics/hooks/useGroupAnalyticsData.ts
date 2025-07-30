import { useGroupStatistics } from "@/lib/api/groupApi";
import { useParams, useRouter } from "next/navigation";
import {
  getLocationFrequencies,
  mapWeekdayData,
} from "@/app/utils/analyticsUtils";
import useAuthStore from "@/stores/authStores";
import { useEffect, useState } from "react";
import Toast from "@/components/ui/Toast";

interface GroupUserDetails {
  scheduleNums: number;
  userName: string;
}

export const useGroupAnalyticsData = () => {
  const params = useParams();
  const groupId = params.groupId as string;
  const { user } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);
  const { data, isPending } = useGroupStatistics(groupId);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (!user && isMounted) {
      Toast("로그인 후 이용해주세요.");
      router.push("/auth/login");
    }
  }, [isMounted, user, router]);

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

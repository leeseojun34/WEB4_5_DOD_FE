import { useGroupStatistics } from "@/lib/api/groupApi";
import { useParams } from "next/navigation";
import GlobalLoading from "@/app/loading";
import {
  getLocationFrequencies,
  mapWeekdayData,
} from "@/app/utils/analyticsUtils";
import MemberParticipationSection from "./MemberParticipationSection";
import WeekdayFrequencySection from "./WeekdayFrequencySection";
import LocationFrequencySection from "./LocationFrequencySection";
import AnalyticsLayout from "./AnalyticsLayout";
import EmptyGroupAnalytics from "./EmptyGroupAnalytics";

const GroupAnalyticsPage = () => {
  const params = useParams();
  const groupId = params.groupId;
  const { data, isPending } = useGroupStatistics(groupId as string);

  console.log(data);

  if (isPending && !data) return <GlobalLoading />;

  const analyticsData = data.data;
  const totalScheduleNum = analyticsData.scheduleNumber;

  const memberParticipationData = analyticsData.groupUserDetails?.sort(
    (a: { scheduleNums: number }, b: { scheduleNums: number }) =>
      b.scheduleNums - a.scheduleNums
  );

  const weekdayData = mapWeekdayData(analyticsData.weekDetails);
  const { locations, counts } = getLocationFrequencies(
    analyticsData.groupSchedules
  );

  if (data.data.scheduleNumber === 0)
    return (
      <AnalyticsLayout>
        <EmptyGroupAnalytics />
      </AnalyticsLayout>
    );

  return (
    <AnalyticsLayout>
      <MemberParticipationSection
        memberData={memberParticipationData}
        totalScheduleNum={totalScheduleNum}
      />
      <WeekdayFrequencySection weekdayData={weekdayData} />
      <LocationFrequencySection locations={locations} counts={counts} />
    </AnalyticsLayout>
  );
};

export default GroupAnalyticsPage;

"use client";

import GlobalLoading from "@/app/loading";
import AnalyticsLayout from "./AnalyticsLayout";
import EmptyGroupAnalytics from "./EmptyGroupAnalytics";
import MemberParticipationSection from "./MemberParticipationSection";
import WeekdayFrequencySection from "./WeekdayFrequencySection";
import LocationFrequencySection from "./LocationFrequencySection";
import { useGroupAnalyticsData } from "./hooks/useGroupAnalyticsData";

const GroupAnalyticsPage = () => {
  const {
    isPending,
    hasNoData,
    groupId,
    totalScheduleNum,
    memberParticipationData,
    weekdayData,
    locations,
    counts,
  } = useGroupAnalyticsData();

  if (isPending) return <GlobalLoading />;

  if (hasNoData)
    return (
      <AnalyticsLayout>
        <EmptyGroupAnalytics groupId={groupId} />
      </AnalyticsLayout>
    );

  return (
    <AnalyticsLayout isData={true}>
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

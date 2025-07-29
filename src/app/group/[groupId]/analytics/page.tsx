import GroupAnalyticsPage from "@/components/feature/group/analytics/GroupAnalyticsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이때어때 - 그룹 통계",
  description: "이때어때 - 그룹 통계",
};

const GroupAnalytics = () => {
  return <GroupAnalyticsPage />;
};
export default GroupAnalytics;

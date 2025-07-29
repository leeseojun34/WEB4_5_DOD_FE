import ScheduleDetail from "@/components/feature/schedule/detail/ScheduleDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이때어때 - 일정",
  description: "이때어때 - 그룹 일정",
};

const ScheduleDetailPage = () => {
  return <ScheduleDetail />;
};
export default ScheduleDetailPage;

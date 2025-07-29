import GroupScheduleCreateSelectPage from "@/components/feature/group/GroupSchdeduleCreateSelectPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이때어때 - 그룹 일정 생성",
  description: "이때어때 - 그룹 일정 생성",
};

const GroupScheduleCreateSelect = () => {
  return <GroupScheduleCreateSelectPage />;
};

export default GroupScheduleCreateSelect;

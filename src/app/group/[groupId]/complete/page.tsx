import GroupCreatedPage from "@/components/feature/group/GroupCreatedPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이때어때 - 그룹 생성 완료!",
  description: "이때어때 - 그룹 생성 완료!",
};

const GroupCreated = () => {
  return <GroupCreatedPage />;
};

export default GroupCreated;

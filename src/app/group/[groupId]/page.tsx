import GroupDetailPage from "@/components/feature/group/detail/GroupDetailPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이때어때 - 그룹",
  description: "이때어때 - 그룹",
};

const GroupPage = () => {
  return <GroupDetailPage />;
};

export default GroupPage;

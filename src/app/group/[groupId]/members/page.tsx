import GroupMembersPage from "@/components/feature/group/members/GroupMembersPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이때어때 - 그룹원",
  description: "이때어때 - 그룹원",
};

const GroupMembers = () => {
  return <GroupMembersPage />;
};
export default GroupMembers;

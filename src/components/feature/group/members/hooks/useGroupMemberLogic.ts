import { useEffect } from "react";
import { useGroupMembers } from "@/lib/api/groupApi";
import { useUser } from "@/lib/api/userApi";

interface MemberDataType {
  userId: string;
  userName: string;
  groupRole: string;
}

export const useGroupMemberLogic = (groupId: string) => {
  const { data: groupData, isPending: groupLoading } = useGroupMembers(groupId);
  const groupMemberData = groupData?.data.groupUser;
  const { data: userData, refetch } = useUser();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const myId = userData?.data.id;
  const amILeader =
    groupMemberData?.filter((user: MemberDataType) => user.userId === myId)[0]
      ?.groupRole === "GROUP_LEADER";

  return {
    groupMemberData,
    myId,
    amILeader,
    groupLoading,
    groupData,
  };
};

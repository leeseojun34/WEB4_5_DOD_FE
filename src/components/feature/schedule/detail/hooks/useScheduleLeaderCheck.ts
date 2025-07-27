import { useEffect, useState } from "react";
import useAuthStore from "@/stores/authStores";

export interface MemberType {
  id: string;
  scheduleMemberId: number;
  name: string;
  scheduleRole: string;
}

export const useScheduleLeaderCheck = (members: MemberType[] = []) => {
  const { user } = useAuthStore();
  const [isLeader, setIsLeader] = useState(false);

  useEffect(() => {
    if (user && members.length > 0) {
      const isMaster = members.some(
        (member) =>
          member.id === user.id && member.scheduleRole === "ROLE_MASTER"
      );
      setIsLeader(isMaster);
    }
  }, [user, members]);

  return isLeader;
};

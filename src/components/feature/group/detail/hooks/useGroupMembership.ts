import { useEffect, useRef, useState } from "react";
import { useAddGroupMember } from "@/lib/api/groupApi";

interface UserType {
  email: string;
  id: string;
  name: string;
  profileImageNumber: number;
  provider: string;
  role: string;
}


export const useGroupMembership = (fromInvite: boolean, user: UserType, groupId: string) => {
  const [isMember, setIsMember] = useState(false);
  const addGroupMember = useAddGroupMember(setIsMember);
  const hasJoinedRef = useRef(false);

  useEffect(() => {
    if (fromInvite && !hasJoinedRef.current && user) {
      hasJoinedRef.current = true;
      addGroupMember.mutate(groupId);
    } else if (!fromInvite) {
      setIsMember(true);
    }
  }, [fromInvite, user, addGroupMember, groupId]);

  return { isMember, addGroupMember };
};
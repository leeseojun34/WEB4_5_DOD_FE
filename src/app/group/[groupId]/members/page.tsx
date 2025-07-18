"use client";

import GroupMemberItem from "@/components/feature/group/GroupMemberItem";
import profileBlack from "@/assets/images/profile_pastel_black.png";
import HeaderTop from "@/components/layout/HeaderTop";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useGroupMembers } from "@/lib/api/groupApi";
import { useEffect } from "react";
import GlobalLoading from "@/app/loading";
import { useUser } from "@/lib/api/userApi";
import { useParams } from "next/navigation";

interface MemberDataType {
  userId: string;
  userName: string;
  groupRole: string;
}

const GroupMembers = () => {
  const params = useParams();
  const groupId = params.groupId as string;

  const { data: groupData, isPending: groupLoading } = useGroupMembers(groupId);
  const groupMemberData = groupData?.data.groupUser;
  const { data: userData, refetch } = useUser();

  useEffect(() => {
    refetch();
  }, [refetch]);
  const myId = userData?.data.id;
  const amILeader =
    groupMemberData?.filter((user: MemberDataType) => user.userId === myId)[0]
      .groupRole === "GROUP_LEADER";

  if (groupLoading) return <GlobalLoading />;

  console.log(groupMemberData);

  return (
    <div className="w-full">
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="pt-25 sm:pt-40 min-w-[375px] w-full max-w-185 flex flex-col justify-center bg-[color:var(--color-white)] mx-auto px-5 gap-5">
        <HeaderTop>그룹원</HeaderTop>
        <div className="text-xs text-[color:var(--color-gray)]">
          인원 <span>1</span>
        </div>
        <div className="flex flex-col gap-4">
          {groupMemberData.map((member: MemberDataType, index: number) => (
            <GroupMemberItem
              character={profileBlack}
              name={member.userName}
              key={`${member.userId}-${index}`}
              role={member.groupRole}
              myId={myId}
              memberId={member.userId}
              isLeader={amILeader}
            />
          ))}
        </div>
      </div>
      <div className="sm:hidden">
        <Footer />
      </div>
    </div>
  );
};
export default GroupMembers;

import HeaderTop from "@/components/layout/HeaderTop";
import MemberCount from "./MemberCount";
import MemberList from "./MemberList";

interface MemberDataType {
  userId: string;
  userName: string;
  groupRole: string;
  profileImageNumber: number;
}

interface GroupMembersContentProps {
  members: MemberDataType[];
  myId: string;
  isLeader: boolean;
  groupId: string
}

const GroupMembersContent = ({
  members,
  myId,
  isLeader,
  groupId
}: GroupMembersContentProps) => {
  console.log(members);
  return (
    <div className="pt-25 sm:pt-40 min-w-[375px] w-full max-w-185 flex flex-col justify-center bg-[color:var(--color-white)] mx-auto px-5 gap-5">
      <HeaderTop>그룹원</HeaderTop>
      <MemberCount count={members.length} />
      <MemberList
        members={members}
        myId={myId}
        isLeader={isLeader}
        groupId={groupId}
      />
    </div>
  );
};

export default GroupMembersContent;

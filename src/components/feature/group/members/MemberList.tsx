import GroupMemberItem from "@/components/feature/group/GroupMemberItem";

interface MemberDataType {
  userId: string;
  userName: string;
  groupRole: string;
  profileImageNumber: number;
}

interface MemberListProps {
  members: MemberDataType[];
  myId: string;
  isLeader: boolean;
}

const MemberList = ({ members, myId, isLeader }: MemberListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {members.map((member: MemberDataType, index: number) => (
        <GroupMemberItem
          profileNum={member.profileImageNumber}
          name={member.userName}
          key={`${member.userId}-${index}`}
          role={member.groupRole}
          myId={myId}
          memberId={member.userId}
          isLeader={isLeader}
        />
      ))}
    </div>
  );
};

export default MemberList;

import GroupMemberItem from "@/components/feature/group/GroupMemberItem";
import profileBlack from "@/assets/images/profile_pastel_black.png";
import profileBlue from "@/assets/images/profile_pastel_blue.png";
import profileGray from "@/assets/images/profile_pastel_gray.png";
import profileGreen from "@/assets/images/profile_pastel_green.png";

const GroupMembers = () => {
  return (
    <div className="mt-9 min-w-[375px] w-full max-w-185 flex flex-col justify-center bg-[color:var(--color-white)] mx-auto px-5 gap-5">
      <div className="text-xs text-[color:var(--color-gray)]">
        인원 <span>1</span>
      </div>
      <div className="flex flex-col gap-4">
        <GroupMemberItem character={profileBlack} name="박코딩" />
        <GroupMemberItem character={profileBlue} name="현코딩" isLeader />
        <GroupMemberItem character={profileGray} name="황코딩" isLeader />
        <GroupMemberItem character={profileGreen} name="수코딩" isLeader />
      </div>
    </div>
  );
};
export default GroupMembers;

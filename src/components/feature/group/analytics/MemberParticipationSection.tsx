import { calculateParticipantion } from "@/app/utils/analyticsUtils";
import GroupAnalyticsSection from "./GroupAnalyticsSection";
import MemberParticipationItem from "./MemberParticipationItem";

interface MemberParticipationSectionProps {
  memberData: { scheduleNums: number; userName: string }[];
  totalScheduleNum: number;
}

const MemberParticipationSection = ({
  memberData,
  totalScheduleNum,
}: MemberParticipationSectionProps) => {
  return (
    <GroupAnalyticsSection color="blue" title="그룹원별 참여율">
      {memberData.map((member, index) => (
        <MemberParticipationItem
          name={member.userName}
          index={index}
          percentage={calculateParticipantion(member.scheduleNums, totalScheduleNum)}
          key={`${member.userName}-${index}`}
        />
      ))}
    </GroupAnalyticsSection>
  );
};

export default MemberParticipationSection;
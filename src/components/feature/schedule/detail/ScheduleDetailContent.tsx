import ShareButton from "@/components/ui/ShareButton";
import MeetingInfo from "../../MeetingInfo";
import WorkSpace from "../../WorkSpace";

type WorkSpaceType =
  | "NOTION"
  | "GITHUB"
  | "MIRO"
  | "FIGMA"
  | "GOOGLEDOCS"
  | "CANVA";

interface ScheduleDetailContentProps {
  scheduleId: string;
  members: string[];
  time: string;
  workspace: { platform: WorkSpaceType; name: string }[];
  children: React.ReactNode;
}

const ScheduleDetailContent = ({
  scheduleId,
  members,
  time,
  workspace,
  children,
}: ScheduleDetailContentProps) => {
  return (
    <>
      <ShareButton
        title="상세 일정 정보 공유하기"
        description="확정된 일정 내용을 공유해보세요"
      />
      <MeetingInfo members={members} time={time} />
      {children}
      <WorkSpace
        workspaces={workspace}
        scheduleId={scheduleId}
      />
    </>
  );
};

export default ScheduleDetailContent;

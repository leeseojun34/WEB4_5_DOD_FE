import ShareButton from "@/components/ui/ShareButton";
import MeetingInfo from "../../MeetingInfo";
import WorkSpace from "../../WorkSpace";
import KakaoScript from "../../KakaoScript";
import { useKakaoShare } from "@/lib/api/useKakaoShare";
import { WorkSpaceType } from "@/lib/api/scheduleApi";

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
  const { shareWithTemplate } = useKakaoShare();
  const handleKakaoShare = () => {
    shareWithTemplate(
      "가장 잘 맞는 시간이 정리되었어요. 아래에서 확인해 주세요."
    );
  };
  return (
    <>
      <ShareButton
        title="상세 일정 정보 공유하기"
        description="확정된 일정 내용을 공유해보세요"
        onClick={handleKakaoShare}
      />
      <MeetingInfo members={members} time={time} />
      {children}
      <WorkSpace workspaces={workspace} scheduleId={scheduleId} />
      <KakaoScript />
    </>
  );
};

export default ScheduleDetailContent;

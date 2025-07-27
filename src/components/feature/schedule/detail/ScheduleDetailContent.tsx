import ShareButton from "@/components/ui/ShareButton";
import MeetingInfo from "../../MeetingInfo";
import WorkSpace from "../../WorkSpace";
import KakaoScript from "../../KakaoScript";
import { useKakaoShare } from "@/lib/api/useKakaoShare";
import { motion } from "framer-motion";
import { itemVariants, listVariants } from "../motion";
import { usePathname } from "next/navigation";

interface ScheduleDetailContentProps {
  scheduleId: string;
  members: { name: string; scheduleRole: string }[];
  time: string;
  workspace: { platform: WorkspacePlatformType; name: string }[];
  children: React.ReactNode;
  isLeader: boolean
}

const ScheduleDetailContent = ({
  scheduleId,
  members,
  time,
  workspace,
  children,
  isLeader
}: ScheduleDetailContentProps) => {
  const { shareWithTemplate } = useKakaoShare();
  const pathname = usePathname();
  const url = `https://localhost:3000/${pathname}`;
  const handleKakaoShare = () => {
    shareWithTemplate(
      "가장 잘 맞는 시간이 정리되었어요. 아래에서 확인해 주세요.",
      url
    );
  };
  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4"
    >
      <motion.div variants={itemVariants}>
        <ShareButton
          title="상세 일정 정보 공유하기"
          description="확정된 일정 내용을 공유해보세요"
          onClick={handleKakaoShare}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <MeetingInfo members={members} time={time} />
      </motion.div>
      {children}
      <motion.div variants={itemVariants}>
        <WorkSpace workspaces={workspace} scheduleId={scheduleId} isLeader={isLeader}/>
      </motion.div>
      <KakaoScript />
    </motion.div>
  );
};

export default ScheduleDetailContent;

import OnlineMeetingRoom from "../../OnlineMeetingRoom";
import ScheduleDetailContent from "./ScheduleDetailContent";
import ScheduleDetailLayout from "./ScheduleDetailLayout";
import { formatSchedule } from "@/app/utils/dateFormat";
import {
  MemberType,
  useScheduleLeaderCheck,
} from "./hooks/useScheduleLeaderCheck";

interface OnineScheduleDetailProps {
  scheduleId: string;
  data: ScheduleDetailType;
}

const OnlineScheduleDetail = ({
  scheduleId,
  data,
}: OnineScheduleDetailProps) => {
  const isLeader = useScheduleLeaderCheck(data?.members as MemberType[]);

  return (
    <ScheduleDetailLayout
      data={data}
      scheduleId={scheduleId}
      isLeader={isLeader}
    >
      <ScheduleDetailContent
        scheduleId={scheduleId}
        isLeader={isLeader}
        members={data.members}
        time={formatSchedule(data.startTime, data.endTime)}
        workspace={data.workspaces.map((workspace: WorkspaceType) => ({
          platform: workspace.type as WorkspacePlatformType,
          name: workspace.name,
        }))}
      >
        <OnlineMeetingRoom
          scheduleId={scheduleId}
          platform={data.meetingPlatform}
          url={data.platformUrl}
          isLeader={isLeader}
        />
      </ScheduleDetailContent>
    </ScheduleDetailLayout>
  );
};

export default OnlineScheduleDetail;

import OnlineMeetingRoom from "../../OnlineMeetingRoom";
import ScheduleDetailContent from "./ScheduleDetailContent";
import ScheduleDetailLayout from "./ScheduleDetailLayout";
import { formatSchedule } from "@/app/utils/dateFormat";

interface OnineScheduleDetailProps {
  scheduleId: string;
  data: ScheduleDetailType;
}

const OnlineScheduleDetail = ({
  scheduleId,
  data,
}: OnineScheduleDetailProps) => {
  return (
    <ScheduleDetailLayout data={data} scheduleId={scheduleId}>
      <ScheduleDetailContent
        scheduleId={scheduleId}
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
        />
      </ScheduleDetailContent>
    </ScheduleDetailLayout>
  );
};

export default OnlineScheduleDetail;

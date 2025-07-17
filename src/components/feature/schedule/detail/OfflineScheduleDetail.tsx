"use client";
import {
  ScheduleDetailType,
  WorkspacePlatformType,
  WorkspaceType,
} from "@/types/schedule";
import MeetingLocation from "../../MeetingLocation";
import ScheduleDetailContent from "./ScheduleDetailContent";
import ScheduleDetailLayout from "./ScheduleDetailLayout";
import { formatSchedule } from "@/app/utils/dateFormat";

interface OfflineScheduleDetailProps {
  scheduleId: string;
  data: ScheduleDetailType;
}

const OfflineScheduleDetail = ({
  scheduleId,
  data,
}: OfflineScheduleDetailProps) => {
  return (
    <ScheduleDetailLayout>
      <ScheduleDetailContent
        scheduleId={scheduleId}
        members={data.members}
        time={formatSchedule(data.startTime, data.endTime)}
        workspace={data.workspaces.map((workspace: WorkspaceType) => ({
          platform: workspace.type as WorkspacePlatformType,
          name: workspace.name,
        }))}
      >
        <MeetingLocation
          location={data.location}
          specificLocation={data.specificLocation}
        />
      </ScheduleDetailContent>
    </ScheduleDetailLayout>
  );
};

export default OfflineScheduleDetail;

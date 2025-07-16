"use client";
import { useParams } from "next/navigation";
import MeetingLocation from "../../MeetingLocation";
import ScheduleDetailContent from "./ScheduleDetailContent";
import ScheduleDetailLayout from "./ScheduleDetailLayout";
import { useGroupSchedule, Workspace } from "@/lib/api/scheduleApi";
import GlobalLoading from "@/app/loading";

const OfflineScheduleDetail = () => {
  const params = useParams();
  const scheduleId = params.Id as string;

  const { data: scheduleData } = useGroupSchedule(scheduleId);

  if (!scheduleData || !scheduleData.data) {
    return <GlobalLoading />;
  }

  return (
    <ScheduleDetailLayout>
      <ScheduleDetailContent
        scheduleId={scheduleId}
        members={scheduleData.data.members}
        time={scheduleData.data.startTime}
        workspace={scheduleData.data.workspaces.map((workspace: Workspace) => ({
          platform: workspace.type,
          name: workspace.name,
        }))}
      >
        <MeetingLocation
          location={scheduleData.data.location}
          specificLocation={scheduleData.data.specificLocation}
        />
      </ScheduleDetailContent>
    </ScheduleDetailLayout>
  );
};

export default OfflineScheduleDetail;

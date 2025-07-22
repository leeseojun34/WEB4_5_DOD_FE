"use client";
import Header from "@/components/layout/Header";
import MeetingLocation from "../../MeetingLocation";
import ScheduleDetailContent from "./ScheduleDetailContent";
import ScheduleDetailLayout from "./ScheduleDetailLayout";
import { formatSchedule } from "@/app/utils/dateFormat";
import Map from "@/components/feature/kakaoMap/Map";
import OfflineBottomSheet from "./OfflineBottomSheet";
import BlurredChevronHeader from "@/components/layout/BlurredChevronHeader";

interface OfflineScheduleDetailProps {
  scheduleId: string;
  data: ScheduleDetailType;
}

const OfflineScheduleDetail = ({
  scheduleId,
  data,
}: OfflineScheduleDetailProps) => {
  return data.specificLocation ? (
    <div className="flex flex-col h-screen relative w-full mx-auto ">
      <div className="hidden sm:block">
        <Header />
      </div>
      <BlurredChevronHeader />
      <div className="flex-1">
        <Map
          longitude={data.specificLongitude}
          latitude={data.specificLatitude}
          offsetY={200}
        />
      </div>
      <OfflineBottomSheet data={data} scheduleId={scheduleId} />
    </div>
  ) : (
    <ScheduleDetailLayout data={data}>
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

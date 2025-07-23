"use client";
import Header from "@/components/layout/Header";
import MeetingLocation from "../../MeetingLocation";
import ScheduleDetailContent from "./ScheduleDetailContent";
import ScheduleDetailLayout from "./ScheduleDetailLayout";
import { formatSchedule } from "@/app/utils/dateFormat";
import Map from "@/components/feature/kakaoMap/Map";
import OfflineBottomSheet from "./OfflineBottomSheet";
import BlurredChevronHeader from "@/components/layout/BlurredChevronHeader";
import LocationEditBottomSheet from "../editSchedule/LocationEditBottomSheet";
import { useState } from "react";

interface OfflineScheduleDetailProps {
  scheduleId: string;
  data: ScheduleDetailType;
}

const OfflineScheduleDetail = ({
  scheduleId,
  data,
}: OfflineScheduleDetailProps) => {
  const [isLocationEditOpen, setIsLocationEditOpen] = useState(false);
  return (
    <>
      {data.specificLocation ? (
        <div className="flex flex-col h-screen relative w-full mx-auto ">
          <div className="hidden sm:block">
            <Header />
          </div>
          <BlurredChevronHeader />
          <div className="flex-1">
            <Map
              longitude={data.specificLongitude}
              latitude={data.specificLatitude}
              offsetY={250}
            />
          </div>
          <OfflineBottomSheet
            data={data}
            scheduleId={scheduleId}
            isLocationEditOpen={isLocationEditOpen}
            setIsLocationEditOpen={setIsLocationEditOpen}
          />
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
              isLocationEditOpen={isLocationEditOpen}
              setIsLocationEditOpen={setIsLocationEditOpen}
            />
          </ScheduleDetailContent>
        </ScheduleDetailLayout>
      )}
      {isLocationEditOpen && (
        <LocationEditBottomSheet
          scheduleId={scheduleId}
          location={data.location}
          specificLocation={data.specificLocation}
          specificLatitude={data.specificLatitude}
          specificLongitude={data.specificLongitude}
          isOpen={isLocationEditOpen ?? false}
          setIsOpen={setIsLocationEditOpen || (() => {})}
        />
      )}
    </>
  );
};

export default OfflineScheduleDetail;

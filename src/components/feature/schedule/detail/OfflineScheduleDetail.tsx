"use client";
import Header from "@/components/layout/Header";
import MeetingLocation from "../../MeetingLocation";
import ScheduleDetailContent from "./ScheduleDetailContent";
import ScheduleDetailLayout from "./ScheduleDetailLayout";
import { formatSchedule } from "@/app/utils/dateFormat";
import BottomSheet from "@/components/ui/BottomSheet";
import Map from "@/components/feature/kakaoMap/Map";
import { useEffect, useState } from "react";
import GroupHeader from "@/components/layout/GroupHeader";

interface OfflineScheduleDetailProps {
  scheduleId: string;
  data: ScheduleDetailType;
}

const OfflineScheduleDetail = ({
  scheduleId,
  data,
}: OfflineScheduleDetailProps) => {
  const [snapPoints, setSnapPoints] = useState([0.6, 0.33, 0.25]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setSnapPoints(width >= 640 ? [0.4, 0.22, 0.16] : [0.6, 0.33, 0.25]);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return data.specificLocation ? (
    <div className="flex flex-col h-screen relative w-full mx-auto ">
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="flex-1">
        <Map longitude={127.0106459} latitude={37.4849424} />
      </div>
      <BottomSheet
        isOpen={true}
        setIsOpen={() => {}}
        snapPoints={snapPoints}
        initialSnap={1}
        className="px-4"
      >
        {() => (
          <>
            <GroupHeader
              name="대나무 행주"
              description="안녕하세요 대나무행주입니다람쥐"
              count={6}
              isLeader={false}
              type="schedule"
              id=""
            />
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
          </>
        )}
      </BottomSheet>
    </div>
  ) : (
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

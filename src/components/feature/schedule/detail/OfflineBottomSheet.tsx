"use client";
import MeetingLocation from "../../MeetingLocation";
import ScheduleDetailContent from "./ScheduleDetailContent";
import { formatSchedule } from "@/app/utils/dateFormat";
import BottomSheet from "@/components/ui/BottomSheet";
import GroupHeaderMap from "@/components/layout/GroupHeaderMap";
import { useEffect, useState } from "react";

interface OfflineBottomSheetProps {
  scheduleId: string;
  data: ScheduleDetailType;
  isLocationEditOpen: boolean;
  setIsLocationEditOpen: (isOpen: boolean) => void;
}

const OfflineBottomSheet = ({
  scheduleId,
  data,
  isLocationEditOpen,
  setIsLocationEditOpen,
}: OfflineBottomSheetProps) => {
  const [snapPoints, setSnapPoints] = useState([0.6, 0.33, 0.25]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setSnapPoints(width >= 640 ? [0.4, 0.22, 0.16] : [0.9, 0.7, 0.05]);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <BottomSheet
        isOpen={!isLocationEditOpen}
        setIsOpen={() => {}}
        snapPoints={snapPoints}
        initialSnap={1}
        className="px-4"
        hideBackdrop={true}
      >
        {() => (
          <>
            <GroupHeaderMap
              name={data.scheduleName}
              description={data.description}
              count={data.members.length}
              isLeader={true}
              id={String(data.eventId)}
            />
            <div className="min-w-[375px] w-full max-w-185 mx-auto pt-6 sm:pt-10">
              <div className="flex flex-col px-5 gap-4">
                <ScheduleDetailContent
                  scheduleId={scheduleId}
                  members={data.members}
                  time={formatSchedule(data.startTime, data.endTime)}
                  workspace={data.workspaces.map(
                    (workspace: WorkspaceType) => ({
                      platform: workspace.type as WorkspacePlatformType,
                      name: workspace.name,
                    })
                  )}
                >
                  <MeetingLocation
                    location={data.location}
                    specificLocation={data.specificLocation}
                    isLocationEditOpen={isLocationEditOpen}
                    setIsLocationEditOpen={setIsLocationEditOpen}
                  />
                </ScheduleDetailContent>
              </div>
            </div>
          </>
        )}
      </BottomSheet>
    </>
  );
};
export default OfflineBottomSheet;

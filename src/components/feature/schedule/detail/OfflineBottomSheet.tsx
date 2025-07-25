"use client";
import MeetingLocation from "../../MeetingLocation";
import ScheduleDetailContent from "./ScheduleDetailContent";
import { formatSchedule } from "@/app/utils/dateFormat";
import BottomSheet from "@/components/ui/BottomSheet";
import GroupHeaderMap from "@/components/layout/GroupHeaderMap";

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
  const snapPoints = [0.9, 0.7, 0.05];

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
          <div className="flex flex-col h-full overflow-y-auto pb-70">
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
          </div>
        )}
      </BottomSheet>
    </>
  );
};
export default OfflineBottomSheet;

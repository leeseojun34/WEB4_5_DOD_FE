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
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { itemVariants } from "../motion";
import { useRouter } from "next/navigation";

interface OfflineScheduleDetailProps {
  scheduleId: string;
  data: ScheduleDetailType;
  userId: string | undefined;
}

const OfflineScheduleDetail = ({
  scheduleId,
  data,
  userId,
}: OfflineScheduleDetailProps) => {
  const [isLocationEditOpen, setIsLocationEditOpen] = useState(false);
  const userData = data.members.find((member) => member.id === userId);
  const isMaster = userData?.scheduleRole === "ROLE_MASTER";

  const [goHome, setGoHome] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const referrer = document.referrer;
    const isFromGroup = referrer.includes("/group/");
    setGoHome(isFromGroup);
  }, []);

  const handleBackHome = () => {
    if (goHome) {
      router.push("/");
    } else {
      router.back();
    }
  };
  return (
    <>
      {data.specificLocation ? (
        <div className="flex flex-col h-screen relative w-full mx-auto ">
          <div className="hidden sm:block">
            <Header />
          </div>
          <BlurredChevronHeader onBack={handleBackHome} />
          <div className="flex-1">
            <Map
              longitude={data.specificLongitude}
              latitude={data.specificLatitude}
              offsetY={240}
            />
          </div>
          <OfflineBottomSheet
            data={data}
            scheduleId={scheduleId}
            isLocationEditOpen={isLocationEditOpen}
            setIsLocationEditOpen={setIsLocationEditOpen}
            isMaster={isMaster}
          />
        </div>
      ) : (
        <ScheduleDetailLayout
          data={data}
          scheduleId={scheduleId}
          isLeader={isMaster}
        >
          <ScheduleDetailContent
            scheduleId={scheduleId}
            members={data.members}
            time={formatSchedule(data.startTime, data.endTime)}
            workspace={data.workspaces.map((workspace: WorkspaceType) => ({
              platform: workspace.type as WorkspacePlatformType,
              name: workspace.name,
            }))}
            isLeader={isMaster}
          >
            <motion.div variants={itemVariants}>
              <MeetingLocation
                location={data.location}
                specificLocation={data.specificLocation}
                isLocationEditOpen={isLocationEditOpen}
                setIsLocationEditOpen={setIsLocationEditOpen}
                isMaster={isMaster}
              />
            </motion.div>
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

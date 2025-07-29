"use client";

import { useParams } from "next/navigation";
import OfflineScheduleDetail from "./OfflineScheduleDetail";
import OnlineScheduleDetail from "./OnlineScheduleDetail";
import { useGroupSchedule } from "@/lib/api/scheduleApi";
import GlobalLoading from "@/app/loading";

const ScheduleDetail = () => {
  const params = useParams();
  const scheduleId = params.id as string;

  const { data: scheduleData, isPending } = useGroupSchedule(scheduleId);

  if (isPending || !scheduleData) {
    return <GlobalLoading />;
  }

  return (
    <>
      {scheduleData.data.meetingType === "ONLINE" ? (
        <OnlineScheduleDetail
          scheduleId={scheduleId}
          data={scheduleData.data}
        />
      ) : (
        <OfflineScheduleDetail
          scheduleId={scheduleId}
          data={scheduleData.data}
        />
      )}
    </>
  );
};
export default ScheduleDetail;

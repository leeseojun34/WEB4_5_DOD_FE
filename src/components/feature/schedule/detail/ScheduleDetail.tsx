import { useParams } from "next/navigation";
import OfflineScheduleDetail from "./OfflineScheduleDetail";
import OnlineScheduleDetail from "./OnlineScheduleDetail";
import { useGroupSchedule } from "@/lib/api/scheduleApi";
import GlobalLoading from "@/app/loading";
import { useEffect, useState } from "react";

const ScheduleDetail = () => {
  const params = useParams();
  const scheduleId = params.Id as string;
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  const { data: scheduleData } = useGroupSchedule(scheduleId);

  useEffect(() => {
    if (scheduleData?.data.meetingType) {
      setIsOnline(scheduleData.data.meetingType !== "OFFLINE");
    }
  }, [scheduleData]);

  if (!scheduleData || !scheduleData.data || isOnline === null) {
    return <GlobalLoading />;
  }

  return (
    <>
      {isOnline ? (
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

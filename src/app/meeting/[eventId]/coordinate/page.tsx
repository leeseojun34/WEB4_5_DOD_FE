"use client";

import CoordinateContent from "@/components/feature/meeting/coordinate/CoordinateContent";
import GroupHeader from "@/components/layout/GroupHeader";
import Header from "@/components/layout/Header";
import { useParams, useRouter } from "next/navigation";
import GlobalLoading from "@/app/loading";
import { useEventScheduleInfo } from "@/lib/api/scheduleApi";
import Toast from "@/components/ui/Toast";
import { AxiosError } from "axios";
import { useEventDetail } from "@/lib/api/scheduleApi";
import { useEffect } from "react";

const CoordinatePage = () => {
  const { eventId, group } = useParams();
  const { data: eventScheduleInfo, error } = useEventScheduleInfo(
    Number(eventId)
  );
  const router = useRouter();
  const { data: eventDetail, error: eventDetailError } = useEventDetail(
    Number(eventId)
  );

  useEffect(() => {
    const err = error || eventDetailError;
    if (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      Toast(axiosError.response?.data.message || "오류가 발생했습니다.");
      router.push(`/`);
    }
  }, [error, eventDetailError]);

  if (!eventScheduleInfo || !eventDetail) {
    return <GlobalLoading />;
  }

  return (
    <section>
      <div className="hidden sm:block">
        <Header type="blue" />
      </div>
      <GroupHeader
        name={eventScheduleInfo.eventTitle}
        description={eventScheduleInfo.description}
        count={eventScheduleInfo.totalMembers}
        isLeader={eventDetail.data.role === "ROLE_MASTER" ? true : false}
        type="schedule"
        id={eventId as string}
      />
      <div className="min-w-[375px] w-full max-w-185 mx-auto relative">
        <CoordinateContent
          eventScheduleInfo={eventScheduleInfo}
          group={group ? "true" : "false"}
        />
      </div>
    </section>
  );
};

export default CoordinatePage;

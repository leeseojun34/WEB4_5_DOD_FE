"use client";

import MySchedule from "@/components/feature/meeting/coordinate/MySchedule";
import GroupHeader from "@/components/layout/GroupHeader";
import Header from "@/components/layout/Header";
import { useParams, useRouter } from "next/navigation";
import { useEventDetail, useEventScheduleInfo } from "@/lib/api/scheduleApi";
import GlobalLoading from "@/app/loading";
import useAuthStore from "@/stores/authStores";
import Toast from "@/components/ui/Toast";
import { useEffect } from "react";
import { AxiosError } from "axios";

const MySchedulePage = () => {
  const { eventId } = useParams();
  const { user } = useAuthStore();
  const router = useRouter();

  const { data: eventScheduleInfo, error: eventScheduleInfoError } =
    useEventScheduleInfo(Number(eventId));
  const { data: eventDetail, error: eventDetailError } = useEventDetail(
    Number(eventId)
  );

  useEffect(() => {
    if (user) {
      for (const member of eventScheduleInfo?.memberSchedules || []) {
        if (member.eventMemberId === user.id) {
          if (member.isConfirmed) {
            Toast("이미 등록된 시간입니다.");
            router.push(`/meeting/${eventId}/coordinate`);
            return;
          }
        }
      }
    } else {
      const err = eventScheduleInfoError || eventDetailError;
      if (err) {
        const axiosError = err as AxiosError<{ message: string }>;
        Toast(axiosError.response?.data.message || "오류가 발생했습니다.");
        router.push(`/`);
      }
    }
  }, [
    user,
    eventScheduleInfo,
    eventId,
    router,
    eventScheduleInfoError,
    eventDetailError,
  ]);

  if (!eventScheduleInfo || !eventDetail) {
    return <GlobalLoading />;
  }
  return (
    <>
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
        <MySchedule eventScheduleInfo={eventScheduleInfo} />
      </div>
    </>
  );
};
export default MySchedulePage;

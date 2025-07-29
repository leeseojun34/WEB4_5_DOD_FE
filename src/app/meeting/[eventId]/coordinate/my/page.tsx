"use client";

import MySchedule from "@/components/feature/meeting/coordinate/MySchedule";
import GroupHeader from "@/components/layout/GroupHeader";
import Header from "@/components/layout/Header";
import { useParams, useRouter } from "next/navigation";
import { useEventDetail, useEventScheduleInfo } from "@/lib/api/scheduleApi";
import GlobalLoading from "@/app/loading";
import useAuthStore from "@/stores/authStores";
import Toast from "@/components/ui/Toast";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useRef } from "react";

const MySchedulePage = () => {
  const { eventId } = useParams();
  const { user } = useAuthStore();
  const router = useRouter();
  const hasHandledConfirmedRedirect = useRef(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { data: eventScheduleInfo, error: eventScheduleInfoError } =
    useEventScheduleInfo(Number(eventId));
  const { data: eventDetail, error: eventDetailError } = useEventDetail(
    Number(eventId)
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (hasHandledConfirmedRedirect.current) return;
    if (!user || !eventScheduleInfo) return;

    for (const member of eventScheduleInfo.memberSchedules) {
      if (member.eventMemberId === user.id && member.isConfirmed) {
        hasHandledConfirmedRedirect.current = true;
        setIsRedirecting(true); // <-- block render
        Toast("이미 시간을 등록하셨어요!");
        router.push(`/meeting/${eventId}/coordinate`);
        break;
      }
    }
  }, [user, eventScheduleInfo, eventId]);

  useEffect(() => {
    const err = eventScheduleInfoError || eventDetailError;
    if (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      Toast(axiosError.response?.data.message || "오류가 발생했습니다.");
      router.push(`/`);
    }
  }, [eventScheduleInfoError, eventDetailError]);

  if (!isMounted) return null;

  if (!user || !eventScheduleInfo || !eventDetail || isRedirecting)
    return <GlobalLoading />;

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

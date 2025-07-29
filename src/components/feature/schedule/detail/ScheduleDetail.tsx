"use client";

import { useParams, useRouter } from "next/navigation";
import OfflineScheduleDetail from "./OfflineScheduleDetail";
import OnlineScheduleDetail from "./OnlineScheduleDetail";
import { useGroupSchedule } from "@/lib/api/scheduleApi";
import GlobalLoading from "@/app/loading";
import useAuthStore from "@/stores/authStores";
import { useEffect, useState } from "react";
import Toast from "@/components/ui/Toast";
import { AxiosError } from "axios";

const ScheduleDetail = () => {
  const params = useParams();
  const scheduleId = params.id as string;
  const router = useRouter();
  const { user } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (!user && isMounted) {
      Toast("로그인 후 이용해주세요.");
      router.push("/auth/login");
    }
  }, [isMounted, user, router]);

  const { data: scheduleData, isPending, error } = useGroupSchedule(scheduleId);

  const err = error as AxiosError<{ status: number }>;

  useEffect(() => {
    if (err) {
      if (err.response?.status === 403) {
        router.back();
        Toast("일정에 포함된 멤버만 조회할 수 있습니다");
      }
    }
  }, [err, router]);

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

"use client";

import MySchedule from "@/components/feature/meeting/coordinate/MySchedule";
import GroupHeader from "@/components/layout/GroupHeader";
import Header from "@/components/layout/Header";
import { useParams, useRouter } from "next/navigation";
import { useEventScheduleInfo } from "@/lib/api/scheduleApi";
import GlobalLoading from "@/app/loading";
import useAuthStore from "@/sotres/authStores";
import Toast from "@/components/ui/Toast";
import { useEffect } from "react";
const MySchedulePage = () => {
  const { eventId } = useParams();
  const { user } = useAuthStore();
  const router = useRouter();

  const { data: eventScheduleInfo } = useEventScheduleInfo(Number(eventId));

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
      Toast("로그인 후 이용해주세요.");
      router.push("/");
    }
  }, [user, eventScheduleInfo, eventId, router]);

  if (!eventScheduleInfo) {
    return <GlobalLoading />;
  }
  return (
    <>
      <div className="hidden sm:block">
        <Header type="blue" />
      </div>
      <GroupHeader
        groupName={eventScheduleInfo.eventTitle}
        groupIntroduction={eventScheduleInfo.description}
        groupCount={eventScheduleInfo.totalMembers}
        clickToInvite={() => console.log("초대함")}
      />
      <div className="min-w-[375px] w-full max-w-185 mx-auto relative">
        <MySchedule eventScheduleInfo={eventScheduleInfo} />
      </div>
    </>
  );
};
export default MySchedulePage;

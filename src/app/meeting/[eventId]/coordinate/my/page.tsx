"use client";

import MySchedule from "@/components/feature/meeting/coordinate/MySchedule";
import GroupHeader from "@/components/layout/GroupHeader";
import Header from "@/components/layout/Header";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getEventScheduleInfo } from "@/lib/api/scheduleApi";
import GlobalLoading from "@/app/loading";

const MySchedulePage = () => {
  const { eventId } = useParams();
  const { data: eventScheduleInfo } = useQuery({
    queryKey: ["eventScheduleInfo", eventId],
    queryFn: () => getEventScheduleInfo(Number(eventId)),
  });

  console.log(eventScheduleInfo);

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
        <MySchedule eventScheduleInfo={eventScheduleInfo.timeTable} />
      </div>
    </>
  );
};
export default MySchedulePage;

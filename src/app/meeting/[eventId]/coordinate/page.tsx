"use client";

import CoordinateContent from "@/components/feature/meeting/coordinate/CoordinateContent";
import GroupHeader from "@/components/layout/GroupHeader";
import Header from "@/components/layout/Header";
import { useParams } from "next/navigation";
import GlobalLoading from "@/app/loading";
import { useEventScheduleInfo } from "@/lib/api/scheduleApi";

const CoordinatePage = () => {
  const { eventId } = useParams();
  const { data: eventScheduleInfo } = useEventScheduleInfo(Number(eventId));

  if (!eventScheduleInfo) {
    return <GlobalLoading />;
  }

  return (
    <section>
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
        <CoordinateContent eventScheduleInfo={eventScheduleInfo} />
      </div>
    </section>
  );
};

export default CoordinatePage;

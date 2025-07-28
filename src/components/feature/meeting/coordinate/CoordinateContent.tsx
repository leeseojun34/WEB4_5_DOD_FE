"use client";

import ScheduleSection from "./ScheduleSection";
import ActionButtons from "./ActionButtons";
import Tip from "@/components/ui/Tip";
import TitleWithShare from "./TitleWithShare";
import useAuthStore from "@/stores/authStores";
import { useEffect, useState } from "react";

const CoordinateContent = ({
  eventScheduleInfo,
}: {
  eventScheduleInfo: EventScheduleInfoType;
}) => {
  const { user } = useAuthStore();
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (user) {
      for (const member of eventScheduleInfo.memberSchedules) {
        if (member.eventMemberId === user.id) {
          if (member.isConfirmed) {
            setIsConfirmed(true);
            break;
          }
        }
      }
    }
  }, [user, eventScheduleInfo]);

  return (
    <div className="pt-6 px-5 pb-9 flex flex-col w-full items-center gap-7 sm:gap-8 sm:pt-10">
      <div className="w-full">
        <TitleWithShare />
      </div>
      <Tip>
        가능한 시간을 입력하면, 구성원들과 겹치는 시간대를 자동으로
        확인해드려요.
      </Tip>
      <ScheduleSection
        title={
          <>
            <span className="text-[color:var(--color-primary-400)]">함께 </span>
            가능한 시간대
          </>
        }
        className="block"
        eventScheduleInfo={eventScheduleInfo}
        mode="common"
      />
      <ActionButtons
        className="sm:mt-2"
        isConfirmed={isConfirmed}
        complete={
          eventScheduleInfo.confirmedMembers === eventScheduleInfo.totalMembers
        }
      />
    </div>
  );
};

export default CoordinateContent;

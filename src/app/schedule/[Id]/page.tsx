"use client";

import MeetingInfo from "@/components/feature/MeetingInfo";
import OnlineMeetingRoom from "@/components/feature/OnlineMeetingRoom";
import WorkSpace from "@/components/feature/WorkSpace";
import GroupHeader from "@/components/layout/GroupHeader";
import ShareButton from "@/components/ui/ShareButton";

const ScheduleDetail = () => {
  return (
    <div>
      {" "}
      <div className="min-w-[375px] w-full max-w-185 mx-auto bg-[color:var(--color-gray-background)] min-h-screen">
        <GroupHeader />
        <div className="flex flex-col pt-6 px-5 gap-4">
          <ShareButton
            title="상세 일정 정보 공유하기"
            description="확정된 일정 내용을 공유해보세요"
          />
          <MeetingInfo
            members={["박준규", "카리나"]}
            time="7월 5일 (금) 12:00 - 24:00"
          />
          <OnlineMeetingRoom />
          <WorkSpace />
        </div>
      </div>
    </div>
  );
};
export default ScheduleDetail;

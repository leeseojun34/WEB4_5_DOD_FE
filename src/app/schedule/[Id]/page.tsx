"use client";

import MeetingInfo from "@/components/feature/MeetingInfo";
import MeetingLocation from "@/components/feature/MeetingLocation";
import OnlineMeetingRoom from "@/components/feature/OnlineMeetingRoom";
import WorkSpace from "@/components/feature/WorkSpace";
import GroupHeader from "@/components/layout/GroupHeader";
import ShareButton from "@/components/ui/ShareButton";

const ScheduleDetail = () => {
  const isOnline = true;
  return (
    <div>
      {" "}
      <div className="min-w-[375px] w-full max-w-185 mx-auto bg-[color:var(--color-gray-background)] min-h-screen">
        <GroupHeader
          groupName="대나무 행주"
          groupIntroduction="안녕하세요 대나무행주입니다람쥐"
          groupCount={6}
          clickToInvite={() => console.log("초대함")}
        />
        <div className="flex flex-col pt-6 px-5 gap-4">
          <ShareButton
            title="상세 일정 정보 공유하기"
            description="확정된 일정 내용을 공유해보세요"
          />
          <MeetingInfo
            members={["박준규", "카리나"]}
            time="7월 5일 (금) 12:00 - 24:00"
          />
          {isOnline ? (
            <OnlineMeetingRoom platform="zoom" name=" 박준규 팬미팅" />
          ) : (
            <MeetingLocation
              location="강남역"
              specificLocation="강남역 스타벅스"
            />
          )}

          <WorkSpace
            workspaces={[
              { platform: "notion", name: "프론트엔드 기획서" },
              { platform: "github", name: "이때 어때 레포지토리" },
              { platform: "miro", name: "이때 어때 미로" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
export default ScheduleDetail;

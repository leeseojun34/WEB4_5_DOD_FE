"use client";

import Footer from "@/components/layout/Footer";
import GroupHeader from "@/components/layout/GroupHeader";
import Header from "@/components/layout/Header";
import ScheduleCard from "@/components/ui/ScheduleCard";
import ShareButton from "@/components/ui/ShareButton";
import Link from "next/link";

const GroupPage = () => {
  return (
    <div className="w-full min-h-screen bg-[color:var(--color-gray-background)]">
      <div className="hidden sm:block">
        <Header type="blue" />
      </div>
      <GroupHeader
        groupName="박준규 팬미팅"
        groupIntroduction="박준규 팬미팅에 오신 것을 환영합니다"
        groupCount={6000}
        clickToInvite={() => console.log("초대함")}
      />
      <div className="min-w-[375px] w-full max-w-185 flex flex-col min-h-screen mx-auto">
        <div className="flex flex-col p-5 pt-4 w-full gap-4 flex-1">
          <Link href="/group/1/schedule/create/select">
            <ShareButton
              title="그룹 일정 생성하기"
              description="그룹 내 멤버들과 새로운 일정 생성하기"
            />
          </Link>
          <div className="flex flex-col gap-4">
            <ScheduleCard
              variant="event"
              title="카츠오모이 가는 날"
              meetingType="온라인"
              time="7월 4일 (금) 18:00 - 22:00"
              members={["박준규", "박은서", "현혜주", "박상윤", "황수지"]}
            />
            <ScheduleCard
              variant="event"
              title="카츠오모이 가는 날"
              meetingType="온라인"
              time="7월 4일 (금) 18:00 - 22:00"
              members={["박은서", "현혜주"]}
            />
            <ScheduleCard
              variant="event"
              title="카츠오모이 가는 날"
              meetingType="온라인"
              time="7월 4일 (금) 18:00 - 22:00"
              members={["박은서", "현혜주"]}
            />
            <ScheduleCard
              variant="event"
              title="카츠오모이 가는 날"
              meetingType="온라인"
              time="7월 4일 (금) 18:00 - 22:00"
              members={["박은서", "현혜주"]}
            />
          </div>
        </div>
      </div>
      <div className="sm:hidden">
        <Footer />
      </div>
    </div>
  );
};
export default GroupPage;

//   name: string;
//   type: "온라인" | "오프라인";
//   time: string;
//   members: string[];

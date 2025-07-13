"use client";

import GroupHeader from "@/components/layout/GroupHeader";
import ScheduleCard from "@/components/ui/ScheduleCard";
import ShareButton from "@/components/ui/ShareButton";
import Link from "next/link";

const GroupPage = () => {
  const scheduleId = 1;
  return (
    <div className="min-w-[375px] w-full max-w-185 flex flex-col min-h-screen mx-auto">
      <GroupHeader
        groupName="사이버 카츠오모이"
        groupIntroduction="안녕하세요 대나무행주입니다람쥐"
        groupCount={6}
        icon="pen"
        clickToInvite={() => console.log("초대됨")}
      />
      <div className="flex flex-col p-5 pt-4 bg-[color:var(--color-gray-background)] w-full gap-4 flex-1">
        <Link href="/group/1/schedule/create/select">
          <ShareButton
            title="그룹 일정 생성하기"
            description="그룹 내 멤버들과 새로운 일정 생성하기"
          />
        </Link>
        <div className="flex flex-col gap-4">
          <Link href={`/schedule/${scheduleId}`}>
            <ScheduleCard
              variant="event"
              title="카츠오모이 가는 날"
              meetingType="온라인"
              time="7월 4일 (금) 18:00 - 22:00"
              members={["박준규", "박은서", "현혜주", "박상윤", "황수지"]}
            />
          </Link>
          <Link href={`/schedule/${scheduleId}`}>
            <ScheduleCard
              variant="event"
              title="카츠오모이 가는 날"
              meetingType="온라인"
              time="7월 4일 (금) 18:00 - 22:00"
              members={["박은서", "현혜주"]}
            />
          </Link>
          <Link href={`/schedule/${scheduleId}`}>
            <ScheduleCard
              variant="event"
              title="카츠오모이 가는 날"
              meetingType="온라인"
              time="7월 4일 (금) 18:00 - 22:00"
              members={["박은서", "현혜주"]}
            />
          </Link>
          <Link href={`/schedule/${scheduleId}`}>
            <ScheduleCard
              variant="event"
              title="카츠오모이 가는 날"
              meetingType="온라인"
              time="7월 4일 (금) 18:00 - 22:00"
              members={["박은서", "현혜주"]}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default GroupPage;

//   name: string;
//   type: "온라인" | "오프라인";
//   time: string;
//   members: string[];

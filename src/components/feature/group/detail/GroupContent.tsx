"use client";

import Link from "next/link";
import ShareButton from "@/components/ui/ShareButton";
import ScheduleCard from "@/components/ui/ScheduleCard";

interface Schedule {
  variant: "event";
  title: string;
  meetingType: "온라인" | "오프라인";
  time: string;
  members: string[];
}

interface GroupContentProps {
  groupId: string;
  schedules: Schedule[];
}

const GroupContent = ({ groupId, schedules }: GroupContentProps) => {
  return (
    <div className="min-w-[375px] w-full max-w-185 flex flex-col min-h-screen mx-auto">
      <div className="flex flex-col p-5 pt-4 w-full gap-4 flex-1">
        <Link href={`/group/${groupId}/schedule/create/select`}>
          <ShareButton
            title="그룹 일정 생성하기"
            description="그룹 내 멤버들과 새로운 일정 생성하기"
          />
        </Link>
        <div className="flex flex-col gap-4">
          {schedules.map((schedule, index) => (
            <ScheduleCard
              key={index}
              variant={schedule.variant}
              title={schedule.title}
              meetingType={schedule.meetingType}
              time={schedule.time}
              members={schedule.members}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupContent;
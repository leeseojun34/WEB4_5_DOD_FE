"use client";

import GroupContent from "@/components/feature/group/detail/GroupContent";
import GroupHeaderSection from "@/components/feature/group/detail/GroupHeaderSection";
import Footer from "@/components/layout/Footer";

interface GroupData {
  groupId: string;
  name: string;
  description: string;
  groupMemberNum: number;
}

interface Schedule {
  variant: "event";
  title: string;
  meetingType: "온라인" | "오프라인";
  time: string;
  members: string[];
}

const GroupDetailPage = () => {
  const groupData: GroupData = {
    groupId: "10001",
    name: "박준규 팬미팅",
    description: "박준규 팬미팅에 오신 것을 환영합니다",
    groupMemberNum: 6000,
  };

  const schedules: Schedule[] = [
    {
      variant: "event",
      title: "카츠오모이 가는 날",
      meetingType: "온라인",
      time: "2025년 7월 25일 (금) 18:00 - 22:00",
      members: ["박준규", "박은서", "현혜주", "박상윤", "황수지"],
    },
    {
      variant: "event",
      title: "카츠오모이 가는 날",
      meetingType: "온라인",
      time: "2025년 7월 25일 (금) 18:00 - 22:00",
      members: ["박은서", "현혜주"],
    },
    {
      variant: "event",
      title: "카츠오모이 가는 날",
      meetingType: "온라인",
      time: "2025년 7월 4일 (금) 18:00 - 22:00",
      members: ["박은서", "현혜주"],
    },
    {
      variant: "event",
      title: "카츠오모이 가는 날",
      meetingType: "온라인",
      time: "2025년 7월 4일 (금) 18:00 - 22:00",
      members: ["박은서", "현혜주"],
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[color:var(--color-gray-background)]">
      <GroupHeaderSection
        groupId={groupData.groupId}
        groupName={groupData.name}
        groupIntroduction={groupData.description}
        groupCount={groupData.groupMemberNum}
      />

      <GroupContent groupId={groupData.groupId} schedules={schedules} />

      <div className="sm:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default GroupDetailPage;

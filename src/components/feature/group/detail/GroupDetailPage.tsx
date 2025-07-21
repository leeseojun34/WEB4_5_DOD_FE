"use client";

import GlobalLoading from "@/app/loading";
import GroupContent from "@/components/feature/group/detail/GroupContent";
import GroupHeaderSection from "@/components/feature/group/detail/GroupHeaderSection";
import Footer from "@/components/layout/Footer";
import { useGroupSchedules } from "@/lib/api/groupApi";
import { useParams } from "next/navigation";

const GroupDetailPage = () => {
  const params = useParams();
  const groupId = params.groupId as string;

  const { data: groupData, isPending } = useGroupSchedules(groupId);

  console.log(groupData?.data.groupRole);
  if (isPending && !groupData) return <GlobalLoading />;

  return (
    <div className="w-full min-h-screen bg-[color:var(--color-gray-background)]">
      <GroupHeaderSection
        groupId={groupData.data.groupId}
        groupName={groupData.data.groupName}
        groupIntroduction={groupData.data.groupDescription}
        groupCount={groupData.data.groupMemberNumbers}
        groupRole={groupData.data.groupRole}
      />

      <GroupContent
        groupId={groupId}
        schedules={groupData.data.scheduleDetails}
        groupRole={groupData.data.groupRole}
      />

      <div className="sm:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default GroupDetailPage;

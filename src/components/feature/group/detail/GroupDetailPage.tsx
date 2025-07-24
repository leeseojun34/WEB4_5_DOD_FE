"use client";

import GlobalLoading from "@/app/loading";
import GroupContent from "@/components/feature/group/detail/GroupContent";
import GroupHeaderSection from "@/components/feature/group/detail/GroupHeaderSection";
import Footer from "@/components/layout/Footer";
import { useGroupSchedules } from "@/lib/api/groupApi";
import { useGroupDetailPage } from "./hooks/useGroupDetailLogic";

const GroupDetailPage = () => {
  const { groupId, userPending, isMember } = useGroupDetailPage();
  const { data: groupData, isPending: groupPending } = useGroupSchedules(
    groupId,
    isMember
  );

  if (userPending || groupPending || !groupData) {
    return <GlobalLoading />;
  }

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

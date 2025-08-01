"use client";

import GlobalLoading from "@/app/loading";
import GroupContent from "@/components/feature/group/detail/GroupContent";
import GroupHeaderSection from "@/components/feature/group/detail/GroupHeaderSection";
import Footer from "@/components/layout/Footer";
import { useGroupSchedules } from "@/lib/api/groupApi";
import { useGroupDetailPage } from "./hooks/useGroupDetailLogic";
import { usePrefetchGroupData } from "./hooks/usePrefetchGroupData";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/ui/Toast";
import { AxiosError } from "axios";

const GroupDetailPage = () => {
  const { groupId, userPending, isMember } = useGroupDetailPage();
  const router = useRouter();
  const {
    data: groupData,
    isPending: groupPending,
    error,
  } = useGroupSchedules(groupId, isMember);
  usePrefetchGroupData(groupId, groupData?.data?.scheduleDetails);

  const err = error as AxiosError<{ status: number }>;

  useEffect(() => {
    if (err) {
      if (err.response?.status === 403) {
        router.push("/");
        Toast("해당 그룹원의 그룹원이 아닙니다.");
      }
    }
  }, [err, router]);

  if (userPending || groupPending || !groupData) {
    return <GlobalLoading />;
  }

  return (
    <div
      className={`w-full min-h-screen bg-[color:var(--color-gray-background)] ${
        groupData.data.scheduleDetails.length >= 3 && "pb-30"
      }`}
    >
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

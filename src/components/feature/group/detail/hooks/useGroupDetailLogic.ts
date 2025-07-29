import { useDeleteSchedule } from "@/lib/api/scheduleApi";
import { useUser } from "@/lib/api/userApi";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthRedirect } from "./useAuthRedirect";
import { useGroupMembership } from "./useGroupMembership";
import ToastWell from "@/components/ui/ToastWell";
import Toast from "@/components/ui/Toast";

export const useGroupScheduleActions = () => {
  const BASE_URL = window.location.origin;
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const deleteSchedule = useDeleteSchedule();
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      ToastWell("✅", "링크를 복사했습니다");
    } catch {
      Toast("링크 복사에 실패했습니다");
    }
  };

  const handleTopClick = (scheduleId: string) => {
    handleCopyClipBoard(`${BASE_URL}/schedule/${scheduleId}`);
    setIsOpen(false);
  };

  const handleBottomClick = () => {
    setIsAlertOpen(true);
    setIsOpen(false);
  };

  const handleAlertAction = (scheduleId: string) => {
    deleteSchedule.mutate(scheduleId);
  };

  return {
    isOpen,
    setIsOpen,
    isAlertOpen,
    setIsAlertOpen,
    handleTopClick,
    handleBottomClick,
    handleAlertAction,
  };
};

export const useGroupDetailPage = () => {
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const groupId = params.groupId as string;
  const redirectUrl = `${pathname}?fromInvite=true`;
  const fromInvite = searchParams.get("fromInvite") === "true";

  const { data: user, isPending: userPending, refetch: fetchUser } = useUser();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useAuthRedirect(user, userPending, redirectUrl);
  const { isMember } = useGroupMembership(fromInvite, user, groupId);

  return {
    groupId,
    user,
    userPending,
    isMember,
    fromInvite,
  };
};

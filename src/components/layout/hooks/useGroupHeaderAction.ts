import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLeaveGroup } from "@/lib/api/groupApi";
import { useDeleteSchedule } from "@/lib/api/scheduleApi";

interface UseGroupHeaderActionsProps {
  id: string;
  isLeader: boolean;
  type: "schedule" | "group";
}

export const useGroupHeaderActions = ({
  id,
  isLeader,
  type,
}: UseGroupHeaderActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const router = useRouter();
  const leaveGroup = useLeaveGroup();
  const deleteSchedule = useDeleteSchedule();

  const handleBack = () => {
    router.back();
  };

  const clickEllipsisHandler = () => {
    setIsOpen(true);
  };

  const handleTopClick = () => {
    setIsOpen(false);

    if (!isLeader) {
      if (type === "group") {
        setIsAlertOpen(true);
      }
    } else {
      if (type === "group") {
        router.push(`/group/${id}/edit`);
      } else {
        router.push(`/schedule/${id}/edit/detail`);
      }
    }
  };

  const handleBottomClick = () => {
    setIsOpen(false);

    if (type === "group") {
      setIsAlertOpen(true);
    }
  };

  const handleAlertAction = () => {
    if (type === "group") {
      leaveGroup.mutate(id, {
        onSuccess: () => {
          setIsAlertOpen(false);
        },
      });
    } else {
      deleteSchedule.mutate(id, {
        onSuccess: () => {
          setIsAlertOpen(false);
        },
      });
    }
  };

  const getDropdownItems = () => {
    if (isLeader) {
      return type === "group"
        ? ["그룹 정보수정", "그룹 나가기"]
        : ["모임 정보수정"];
    } else {
      return ["그룹 나가기"];
    }
  };

  const getAlertContent = () => {
    return "정말 그룹에서 나가시겠습니까?";
  };

  const shouldShowEllipsis = () => {
    if (type === "schedule" && !isLeader) {
      return false;
    }
    return true;
  };

  return {
    isOpen,
    setIsOpen,
    isAlertOpen,
    setIsAlertOpen,
    handleBack,
    clickEllipsisHandler,
    handleTopClick,
    handleBottomClick,
    handleAlertAction,
    getDropdownItems,
    getAlertContent,
    shouldShowEllipsis,
  };
};

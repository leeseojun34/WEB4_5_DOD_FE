import { useDeleteSchedule } from "@/lib/api/scheduleApi";
import { useState } from "react";
import toast from "react-hot-toast";

export const useGroupScheduleActions = () => {
  //   const BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const BASE_URL = "https://localhost:3000";
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const deleteSchedule = useDeleteSchedule();

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("링크를 복사했습니다");
    } catch {
      toast("링크 복사에 실패했습니다");
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

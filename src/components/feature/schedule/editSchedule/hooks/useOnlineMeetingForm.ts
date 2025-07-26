import { useState } from "react";
import {
  useCreateMeetingRoom,
  useUpdateScheduleInfo,
} from "@/lib/api/scheduleApi";

export const useOnlineMeetingForm = (scheduleId: string, close: () => void) => {
  const [selectedPlatform, setSelectedPlatform] = useState<OnlineMeetingPlatformType | null>(
    null
  );
  const [inputValue, setInputValue] = useState("");
  const createMeetingRoom = useCreateMeetingRoom();
  const updateScheduleInfo = useUpdateScheduleInfo();

  const handleChangePlatform = (p: OnlineMeetingPlatformType | null) => {
    setSelectedPlatform(p);
  };

  const handleCreateMeetingRoom = () => {
    createMeetingRoom.mutate(scheduleId);
    close();
  };

  const handleUpdateMeetingRoom = () => {
    if (selectedPlatform && inputValue) {
      updateScheduleInfo.mutate({
        scheduleId,
        data: {
          meetingPlatform: selectedPlatform as OnlineMeetingPlatformType,
          platformURL: inputValue,
        },
      });
      close();
    }
  };

  const handleDeleteMeetingRoom = () => {
    updateScheduleInfo.mutate({
      scheduleId,
      data: {
        meetingPlatform: "NONE",
        platformURL: null,
      },
    });
    setInputValue("");
    handleChangePlatform(null);
    close();
  };

  return {
    selectedPlatform,
    inputValue,
    handleChangePlatform,
    handleCreateMeetingRoom,
    handleUpdateMeetingRoom,
    handleDeleteMeetingRoom,
    setInputValue,
  };
};

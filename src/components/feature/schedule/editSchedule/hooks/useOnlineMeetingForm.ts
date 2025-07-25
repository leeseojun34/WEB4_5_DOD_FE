import { useState } from "react";
import {
  useCreateMeetingRoom,
  useUpdateScheduleInfo,
} from "@/lib/api/scheduleApi";

export type PlatformType = "ZOOM" | "GOOGLE_MEET" | "DISCORD" | "ZEP";

export const useOnlineMeetingForm = (scheduleId: string, close: () => void) => {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType | null>(
    null
  );
  const [inputValue, setInputValue] = useState("");
  const createMeetingRoom = useCreateMeetingRoom();
  const updateScheduleInfo = useUpdateScheduleInfo();
  const [isError, setIsError] = useState(false);

  const handleChangePlatform = (p: PlatformType) => {
    setSelectedPlatform(p);
  };

  const handleCreateMeetingRoom = () => {
    createMeetingRoom.mutate(scheduleId);
    close();
  };

  const handleUpdateMeetingRoom = () => {
    if (!selectedPlatform || !inputValue) {
      setIsError(true);
    } else {
      setIsError(false);
      updateScheduleInfo.mutate({
        scheduleId,
        data: {
          meetingPlatform: selectedPlatform as PlatformType,
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
    isError,
  };
};

"use client";
import { formatSchedule } from "@/app/utils/dateFormat";
import { useGroupSchedule } from "@/lib/api/scheduleApi";
import { ChangeEvent, useEffect, useState } from "react";

export const useEditSchedule = (id: string) => {
  const { data: scheduleData } = useGroupSchedule(id);
  const [scheduleName, setScheduleName] = useState("");
  const [scheduleDescription, setScheduleDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const meetingType = scheduleData ? scheduleData.data.meetingType : "";
  const scheduleTime = scheduleData
    ? formatSchedule(scheduleData.data.startTime, scheduleData.data.endTime)
    : "";

  useEffect(() => {
    if (scheduleData) {
      setScheduleName(scheduleData.data.scheduleName);
      setScheduleDescription(scheduleData.data.description);
    }
  }, [scheduleData]);

  const handleScheduleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setScheduleName(e.target.value);
  };

  const handleScheduleDescriptionChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setScheduleDescription(e.target.value);
  };

  const handleTimeClick = () => {
    setIsOpen(!isOpen);
  };

  const handleEditComplete = () => {
    console.log("수정 완료", {
      scheduleName,
      scheduleDescription,
      selectedDate,
    });
  };

  const handleDelete = () => {
    console.log("모임 삭제");
  };

  return {
    scheduleName,
    scheduleDescription,
    meetingType,
    isOpen,
    selectedDate,
    scheduleTime,
    setIsOpen,
    setSelectedDate,
    handleScheduleNameChange,
    handleScheduleDescriptionChange,
    handleTimeClick,
    handleEditComplete,
    handleDelete,
  };
};

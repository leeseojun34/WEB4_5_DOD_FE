"use client";
import { formatSchedule, toISOStringWithTime } from "@/app/utils/dateFormat";
import {
  useDeleteSchedule,
  useGroupSchedule,
  useUpdateScheduleInfo,
} from "@/lib/api/scheduleApi";
import { ChangeEvent, useEffect, useState } from "react";

export const useEditSchedule = (id: string) => {
  const { data: scheduleData } = useGroupSchedule(id);
  const [scheduleName, setScheduleName] = useState("");
  const [scheduleDescription, setScheduleDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const meetingType = scheduleData ? scheduleData.data.meetingType : "";
  const scheduleTime = scheduleData
    ? formatSchedule(scheduleData.data.startTime, scheduleData.data.endTime)
    : "";
  const deleteSchedule = useDeleteSchedule();
  const updateSchedule = useUpdateScheduleInfo();

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
    if (selectedDate) {
      const startISOTime = toISOStringWithTime(selectedDate, startTime);
      const endISOTime = toISOStringWithTime(selectedDate, endTime);

      updateSchedule.mutate({
        scheduleId: id,
        data: { startTime: startISOTime!, endTime: endISOTime! },
      });
      setIsOpen(false);
    }
  };

  const handleDelete = () => {
    deleteSchedule.mutate(id);
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
    startTime,
    endTime,
    setStartTime,
    setEndTime,
  };
};

"use client";
import { ChangeEvent, useState } from "react";

export const useEditSchedule = () => {
  const [scheduleName, setScheduleName] = useState("");
  const [scheduleDescription, setScheduleDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  
  const scheduleTime = "2025년 07월 05일 17:36";

  const handleScheduleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setScheduleName(e.target.value);
  };

  const handleScheduleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setScheduleDescription(e.target.value);
  };

  const handleTimeClick = () => {
    setIsOpen(!isOpen);
  };

  const handleEditComplete = () => {
    console.log("수정 완료", { scheduleName, scheduleDescription, selectedDate });
  };

  const handleDelete = () => {
    console.log("모임 삭제");
  };

  return {
    scheduleName,
    scheduleDescription,
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
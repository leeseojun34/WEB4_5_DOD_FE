"use client";

import ActionButtons from "@/components/feature/schedule/editSchedule/ActionButtons";
import ScheduleForm from "@/components/feature/schedule/editSchedule/ScheduleForm";
import TimeEditBottomSheet from "@/components/feature/schedule/editSchedule/TimeEditBottomSheet";
import { useEditSchedule } from "@/components/feature/schedule/hooks/useEditSchedule";
import HeaderTop from "@/components/layout/HeaderTop";

const EditScheduleInfo = () => {
  const {
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
  } = useEditSchedule();
  return (
    <div className="min-w-[375px] w-full max-w-185 mx-auto pt-25 px-5 min-h-screen relative">
      <HeaderTop>일정 정보 수정</HeaderTop>

      <ScheduleForm
        scheduleName={scheduleName}
        scheduleDescription={scheduleDescription}
        scheduleTime={scheduleTime}
        onScheduleNameChange={handleScheduleNameChange}
        onScheduleDescriptionChange={handleScheduleDescriptionChange}
        onTimeClick={handleTimeClick}
      />

      <TimeEditBottomSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        onComplete={handleEditComplete}
      />

      <ActionButtons
        onDelete={handleDelete}
        onEditComplete={handleEditComplete}
      />
    </div>
  );
};

export default EditScheduleInfo;

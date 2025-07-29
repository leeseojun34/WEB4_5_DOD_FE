"use client";

import GlobalLoading from "@/app/loading";
import ScheduleForm from "@/components/feature/schedule/editSchedule/ScheduleForm";
import TimeEditBottomSheet from "@/components/feature/schedule/editSchedule/TimeEditBottomSheet";
import { useEditSchedule } from "@/components/feature/schedule/editSchedule/hooks/useEditSchedule";
import Header from "@/components/layout/Header";
import HeaderTop from "@/components/layout/HeaderTop";
import Toast from "@/components/ui/Toast";
import useAuthStore from "@/stores/authStores";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditScheduleInfoPage = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (!user && isMounted) {
      Toast("로그인 후 이용해주세요.");
      router.push("/auth/login");
    }
  }, [isMounted, user, router]);
  
  const params = useParams();
  const id = params.id as string;

  const {
    scheduleName,
    scheduleDescription,
    isOpen,
    selectedDate,
    scheduleTime,
    meetingType,
    setIsOpen,
    setSelectedDate,
    handleScheduleNameChange,
    handleScheduleDescriptionChange,
    handleTimeClick,
    handleEditTime,
    handleDelete,
    setStartTime,
    setEndTime,
    handleEditInfo,
    startTime,
    endTime,
    schedulePending,
    isError,
    setIsError,
  } = useEditSchedule(id);

  if (schedulePending) return <GlobalLoading />;

  return (
    <div className="w-full">
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="min-w-[375px] w-full max-w-185 mx-auto pt-25 sm:pt-40 px-5 min-h-screen relative">
        <HeaderTop>일정 정보 수정</HeaderTop>

        <ScheduleForm
          scheduleName={scheduleName}
          scheduleDescription={scheduleDescription}
          scheduleTime={scheduleTime}
          meetingType={meetingType}
          onScheduleNameChange={handleScheduleNameChange}
          onScheduleDescriptionChange={handleScheduleDescriptionChange}
          onTimeClick={handleTimeClick}
          handleDelete={handleDelete}
          handleEditInfo={handleEditInfo}
        />

        <TimeEditBottomSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onComplete={handleEditTime}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          startTime={startTime}
          endTime={endTime}
          isError={isError}
          setIsError={setIsError}
        />
      </div>
    </div>
  );
};

export default EditScheduleInfoPage;

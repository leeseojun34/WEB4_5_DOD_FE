"use client";
import Image from "next/image";
import Header from "../layout/Header";
import HeaderTop from "../layout/HeaderTop";
import rabbitWriting from "@/assets/images/rabbit_writing.png";
import UserScheduleList from "./UserScheduleList";
import { getUserSchedules, UserScheduleResponse } from "@/lib/api/dashboardApi";
import { useEffect, useState } from "react";
import EmptyUserScheduleList from "./EmptyUserScheduleList";

const UserSchedule = () => {
  const [schedules, setSchedules] = useState<UserScheduleResponse>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await getUserSchedules("2025-07-01", "2026-07-01");
        setSchedules(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[color:var(--color-gray-background)]">
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="min-w-[375px] w-full max-w-185 bg-[color:var(--color-gray-background)] mx-auto pt-8 sm:pt-30">
        <HeaderTop>나의 이때어때 일정</HeaderTop>
      </div>
      {Object.values(schedules).flat().length === 0 ? (
        <div className="min-w-[335px] w-full mx-auto max-w-185 px-5 pt-15 sm:pt-10">
          <EmptyUserScheduleList />
        </div>
      ) : (
        <div className="min-w-[375px] w-full max-w-185 min-h-screen px-5 mx-auto pt-10 sm:pt-0 pb-20">
          <Image
            src={rabbitWriting}
            alt="글쓰는 토끼 이미지"
            className="w-[178px] h-[178px] ml-auto"
          />
          <UserScheduleList
            schedules={Object.values(schedules).flat()}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
};
export default UserSchedule;

"use client";
import Header from "../layout/Header";
import HeaderTop from "../layout/HeaderTop";
import { Footer } from "react-day-picker";
import UserScheduleList from "./UserScheduleList";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserSchedules, UserScheduleResponse } from "@/lib/api/dashboardApi";

const LoadUserSchedule = () => {
  const params = useParams();
  const groupId = params.groupId;

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
        <HeaderTop>불러올 일정 선택</HeaderTop>
      </div>
      <div className="min-w-[375px] w-full max-w-185 min-h-screen px-5 mx-auto pt-15 sm:pt-0 pb-30">
        <UserScheduleList
          schedules={Object.values(schedules).flat()}
          groupId={Number(groupId) ?? undefined}
          isLoading={isLoading}
        />
      </div>
      <div className="sm:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default LoadUserSchedule;

"use client";
import Image from "next/image";
import Header from "../layout/Header";
import HeaderTop from "../layout/HeaderTop";
import { Footer } from "react-day-picker";
import rabbitWriting from "@/assets/images/rabbit_writing.png";
import UserScheduleList from "./UserScheduleList";
import { useSearchParams } from "next/navigation";
import { getUserSchedules, UserScheduleResponse } from "@/lib/api/dashboardApi";
import { useEffect, useState } from "react";

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

  const searchParams = useSearchParams();
  const groupId = searchParams?.get("groupId");

  return (
    <div className="w-full min-h-screen bg-[color:var(--color-gray-background)]">
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="min-w-[375px] w-full max-w-185 bg-[color:var(--color-gray-background)] mx-auto pt-8 sm:pt-30">
        <HeaderTop>
          {groupId ? "불러올 일정 선택" : "나의 이때어때 일정"}
        </HeaderTop>
      </div>
      <div className="min-w-[375px] w-full max-w-185 min-h-screen px-5 mx-auto pt-10 sm:pt-0">
        {!groupId && (
          <Image
            src={rabbitWriting}
            alt="글쓰는 토끼 이미지"
            className="w-[178px] h-[178px] ml-auto"
          />
        )}
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
export default UserSchedule;

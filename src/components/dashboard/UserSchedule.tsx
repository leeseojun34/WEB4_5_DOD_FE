"use client";
import Image from "next/image";
import Header from "../layout/Header";
import HeaderTop from "../layout/HeaderTop";
import { Footer } from "react-day-picker";
import rabbitWriting from "@/assets/images/rabbit_writing.png";
import UserScheduleList from "./UserScheduleList";
import { useDashboard } from "@/lib/api/dashboardApi";
import { formatDate } from "@/app/utils/dateFormat";
import GlobalLoading from "@/app/loading";
import { useSearchParams } from "next/navigation";

const UserSchedule = () => {
  const { data: scheduleData, isPending } = useDashboard(
    formatDate(new Date())
  );
  const searchParams = useSearchParams();
  const isLoadMode = searchParams?.get("mode") === "load";
  if (isPending) return <GlobalLoading />;

  return (
    <div className="w-full min-h-screen bg-[color:var(--color-gray-background)]">
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="min-w-[375px] w-full max-w-185 bg-[color:var(--color-gray-background)] mx-auto pt-8 sm:pt-30">
        <HeaderTop>
          {isLoadMode ? "불러올 일정 선택" : "나의 이때어때 일정"}
        </HeaderTop>
      </div>
      <div className="min-w-[375px] w-full max-w-185 min-h-screen px-5 mx-auto pt-10">
        {!isLoadMode && (
          <Image
            src={rabbitWriting}
            alt="글쓰는 토끼 이미지"
            className="w-[178px] h-[178px] ml-auto"
          />
        )}
        <UserScheduleList
          schedules={scheduleData.data.schedules}
          isLoadMode={isLoadMode}
        />
      </div>
      <div className="sm:hidden">
        <Footer />
      </div>
    </div>
  );
};
export default UserSchedule;

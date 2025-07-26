"use client";
import Header from "../layout/Header";
import HeaderTop from "../layout/HeaderTop";
import { Footer } from "react-day-picker";
import { useParams } from "next/navigation";
import {
  DashboardScheduleType,
  useUserSchedulse,
} from "@/lib/api/dashboardApi";
import { OptionBoxSkeleton } from "./Skeleton";
import LoadUserScheduleList from "./LoadUserScheduleList";

const LoadUserSchedule = () => {
  const params = useParams();
  const groupId = params.groupId;

  const { data: userSchedules, isPending: isUserSchedulePending } =
    useUserSchedulse();

  const renderSkeletons = () => {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <OptionBoxSkeleton key={i} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[color:var(--color-gray-background)]">
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="min-w-[375px] w-full max-w-185 bg-[color:var(--color-gray-background)] mx-auto pt-8 sm:pt-30">
        <HeaderTop>불러올 일정 선택</HeaderTop>
      </div>
      <div className="min-w-[375px] w-full max-w-185 min-h-screen px-5 mx-auto pt-20 pb-30">
        {isUserSchedulePending ? (
          renderSkeletons()
        ) : Object.values(userSchedules).flat().length === 0 ? (
          <div className="w-full h-full flex justify-center items-center text-xs text-[color:var(--color-gray-placeholder)]">
            불러올 일정이 없습니다.
          </div>
        ) : (
          <LoadUserScheduleList
            schedules={
              Object.values(userSchedules).flat() as DashboardScheduleType[]
            }
            groupId={Number(groupId) ?? undefined}
          />
        )}
      </div>
      <div className="sm:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default LoadUserSchedule;

"use client";
import Image from "next/image";
import Header from "../layout/Header";
import HeaderTop from "../layout/HeaderTop";
import rabbitWriting from "@/assets/images/rabbit_writing.png";
import UserScheduleList from "./UserScheduleList";
import {
  DashboardScheduleType,
  useUserSchedulse,
} from "@/lib/api/dashboardApi";
import EmptyUserScheduleList from "./EmptyUserScheduleList";
import { ScheduleCardSkeleton } from "./Skeleton";

const UserSchedule = () => {
  const { data: userSchedules, isPending: isUserSchedulePending } =
    useUserSchedulse();

  const renderSkeletons = () => {
    return Array.from({ length: 3 }).map((_, i) => (
      <ScheduleCardSkeleton key={i} />
    ));
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[color:var(--color-gray-background)]">
        <div className="hidden sm:block">
          <Header />
        </div>
        <div className="min-w-[375px] w-full max-w-185 bg-[color:var(--color-gray-background)] mx-auto pt-8 sm:pt-30">
          <HeaderTop>나의 이때어때 일정</HeaderTop>
        </div>

        <div className="min-w-[375px] w-full max-w-185 min-h-screen px-5 mx-auto pt-10 sm:pt-0 pb-20">
          <Image
            src={rabbitWriting}
            alt="글쓰는 토끼 이미지"
            className="w-[178px] h-[178px] ml-auto"
          />
          {isUserSchedulePending ? (
            renderSkeletons()
          ) : Object.values(userSchedules).flat().length === 0 ? (
            <div className="min-w-[335px] w-full mx-auto max-w-185 px-5 pt-15 sm:pt-10">
              <EmptyUserScheduleList />
            </div>
          ) : (
            <UserScheduleList
              schedules={
                Object.values(userSchedules).flat() as DashboardScheduleType[]
              }
            />
          )}
        </div>
      </div>
    </>
  );
};
export default UserSchedule;

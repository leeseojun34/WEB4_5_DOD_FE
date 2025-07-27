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
import GlobalLoading from "@/app/loading";

const UserSchedule = () => {
  const { data: userSchedules, isPending: isUserSchedulePending } =
    useUserSchedulse();

  if (isUserSchedulePending) return <GlobalLoading />;

  const userSchedule = Object.values(
    userSchedules
  ).flat() as DashboardScheduleType[];
  const filteredUserSchedules = userSchedule.filter(
    (schedule) => schedule.activated === true
  );

  return (
    <>
      <div className="w-full min-h-screen bg-[color:var(--color-gray-background)] relative">
        <div className="hidden sm:block">
          <Header />
        </div>
        <div className="min-w-[375px] w-full max-w-185 bg-[color:var(--color-gray-background)] mx-auto pt-8 sm:pt-30">
          <HeaderTop>나의 이때어때 일정</HeaderTop>
        </div>

        <div className="min-w-[375px] w-full max-w-185 px-5 mx-auto pt-7 sm:pt-0 ">
          {filteredUserSchedules.length === 0 ? (
            <EmptyUserScheduleList />
          ) : (
            <>
              <Image
                src={rabbitWriting}
                alt="글쓰는 토끼 이미지"
                className="w-[178px] h-[178px] ml-auto"
              />
              <UserScheduleList schedules={filteredUserSchedules} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default UserSchedule;

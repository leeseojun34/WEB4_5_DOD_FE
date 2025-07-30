"use client";

import SubwayCard from "@/components/ui/SubwayCard";
import tikky from "@/assets/images/rabbit_pin_sit.png";
import Image from "next/image";
import Map from "@/components/feature/kakaoMap/Map";
import { Button } from "@/components/ui/Button";
import PopupMessage from "@/components/ui/PopupMessage";
import HeaderTop from "@/components/layout/HeaderTop";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import { useSuggestedLocations } from "@/lib/api/ElectionApi";
import { Station } from "@/types/station";
import GlobalLoading from "@/app/loading";
import { useGroupSchedule } from "@/lib/api/scheduleApi";
import useAuthRequired from "../feature/schedule/hooks/useAuthRequired";
import ToastWell from "../ui/ToastWell";
import { useEffect, useState } from "react";
import getTotalTravelTime from "@/app/utils/getTotalTravelTime";

const ShowMiddleLocationPage = () => {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated, isLoading: isAuthLoading, user } = useAuthRequired();
  const scheduleId = params.id as string;
  const userId = user?.id;
  const { data: suggestedLocationsData, isLoading: isScheduleLoading } =
    useSuggestedLocations(scheduleId);
  const { data: schedule } = useGroupSchedule(scheduleId);
  const [userPosition, setUserPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [winnerStation, setWinnerStation] = useState<Station | null>(null);

  useEffect(() => {
    if (isAuthLoading || isScheduleLoading) return;
    if (!schedule?.data?.members || !userId) return;

    const isUserInSchedule = schedule.data.members.some(
      (member: MemberType) => member.id === userId
    );

    if (!isUserInSchedule) {
      ToastWell("🚫", "해당 일정에 포함된 멤버가 아닙니다.");
      router.replace("/");
    }
  }, [isAuthLoading, isScheduleLoading, schedule, userId, router]);

  useEffect(() => {
    if (!schedule?.data?.members || !userId) return;

    const myMemberInfo = schedule.data.members.find(
      (member: MemberType) => member.id === userId
    );

    if (
      myMemberInfo &&
      myMemberInfo.latitude != null &&
      myMemberInfo.longitude != null
    ) {
      setUserPosition({
        latitude: myMemberInfo.latitude,
        longitude: myMemberInfo.longitude,
      });
    }
  }, [schedule, userId]);

  const winnerStationData =
    suggestedLocationsData?.data?.suggestedLocations?.find(
      (station: Station) => station.voteStatus === "WINNER"
    );

  useEffect(() => {
    if (!userPosition || !winnerStationData) return;
    const calc = async () => {
      try {
        const time = await getTotalTravelTime(
          { x: userPosition.longitude, y: userPosition.latitude },
          { x: winnerStationData.longitude, y: winnerStationData.latitude }
        );

        setWinnerStation({
          ...winnerStationData,
          travelTime: time,
        });
      } catch (e) {
        console.error("실패", e);
        setWinnerStation({
          ...winnerStationData,
          travelTime: -1,
        });
      }
    };
    calc();
  }, [userPosition, winnerStationData]);

  // console.log(winnerStation);

  const goToSchedule = () => {
    router.push(`/schedule/${scheduleId}`);
  };

  if (
    isAuthLoading ||
    isScheduleLoading ||
    !isAuthenticated ||
    !winnerStation
  ) {
    return <GlobalLoading />;
  }

  return (
    <>
      <main className="flex flex-col h-screen w-full mx-auto">
        <div className="hidden sm:block">
          <Header />
        </div>
        <HeaderTop>{schedule?.data.scheduleName}</HeaderTop>
        <div className="pt-[154px] px-5 flex flex-col justify-between gap-2 m-0">
          <h2 className="font-semibold sm:text-2xl text-xl text-[var(--color-gray)]">
            {schedule?.data.scheduleName}
          </h2>

          <h1 className="font-semibold text-xl sm:text-2xl text-[var(--color-black)]">
            <span className="text-[var(--color-primary-400)]">중간 지점</span>{" "}
            투표 결과
          </h1>
        </div>
        <div className="flex flex-col px-5 w-full my-auto items-center gap-6 sm:gap-10 ">
          <div className="relative my-6 flex w-full ">
            <Image
              src={tikky}
              alt="img"
              width={104}
              height={110}
              className="absolute right-8 bottom-23.5 z-10"
            />
            <SubwayCard
              station={winnerStation}
              isSelected={true}
              isPointer={false}
            />
          </div>
          <div className="w-[316px] sm:w-[500px] mx-auto aspect-square rounded-lg overflow-hidden shadow-[var(--shadow-common)]">
            <Map
              latitude={winnerStation.latitude}
              longitude={winnerStation.longitude}
            />
          </div>
        </div>
        <div className="w-full px-5 pb-8.5 flex flex-col items-center justify-center gap-4">
          <div className="sm:pt-0 pt-5">
            <PopupMessage>
              <span className="text-[var(--color-primary-400)]">2명</span>의
              친구들이{" "}
              <span className="text-[var(--color-primary-400)]">
                {winnerStation.locationName}
              </span>
              을 택했습니다.
            </PopupMessage>
          </div>
          <Button onClick={goToSchedule}>세부 장소 정하러 가기</Button>
        </div>
      </main>
    </>
  );
};

export default ShowMiddleLocationPage;

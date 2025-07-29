"use client";
import takka from "@/assets/images/rabbit_vote2.png";
import Image from "next/image";
import { Station } from "@/types/station";
import { useEffect, useState } from "react";
import SubwayCard from "@/components/ui/SubwayCard";
import PopupMessage from "@/components/ui/PopupMessage";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import HeaderTop from "@/components/layout/HeaderTop";
import { useParams } from "next/navigation";
import getTotalTravelTime from "@/app/utils/getTotalTravelTime";
import {
  useSuggestedLocations,
  useVoteDepartLocation,
  useVoteMembers,
  VoteMember,
} from "@/lib/api/ElectionApi";

import { useGroupSchedule } from "@/lib/api/scheduleApi";
import ToastWell from "@/components/ui/ToastWell";
import useAuthStore from "@/stores/authStores";
import { easeOut } from "framer-motion";

const cache: { [key: string]: number } = {};

const listVariants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

const SkeletonText = () => (
  <div className="h-7 w-1/3 bg-[var(--color-gray-100)] rounded animate-pulse" />
);

//출도착 위치가 비슷한지 검증
const isSameLocation = (
  pos1: { latitude: number; longitude: number },
  pos2: { latitude: number; longitude: number }
) => {
  const threshold = 0.0001; // 약 10미터 이내면 같은 위치로 간주
  return (
    Math.abs(pos1.latitude - pos2.latitude) < threshold &&
    Math.abs(pos1.longitude - pos2.longitude) < threshold
  );
};

const ElectionSpot = () => {
  const params = useParams();
  const scheduleId = params.id as string;
  const { data: suggestedLocationsData } = useSuggestedLocations(scheduleId);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [stationList, setStationList] = useState<Station[]>([]);
  const { mutate: voteDepartLocation } = useVoteDepartLocation();
  const { data: scheduleData, isPending } = useGroupSchedule(scheduleId);
  const { user } = useAuthStore();
  const userId = user?.id;
  const [userPosition, setUserPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  //console.log(suggestedLocationsData);

  const voteMemberList = useVoteMembers(scheduleId).data || [];
  const hasVoted =
    Boolean(userId) &&
    voteMemberList.some((m: VoteMember) => m.memberId === userId);

  useEffect(() => {
    if (isPending) return;
    if (!scheduleData?.data?.members || !userId) return;

    const myMemberInfo = scheduleData.data.members.find(
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
  }, [scheduleData, userId, isPending]);

  useEffect(() => {
    if (!suggestedLocationsData?.data?.suggestedLocations || !userPosition) {
      setStationList([]);
      return;
    }
    const fetchTravelTimes = async () => {
      const updateStations = await Promise.all(
        suggestedLocationsData.data.suggestedLocations.map(
          async (station: Station) => {
            const fixed = (num: number) => num.toFixed(5);
            const cacheKey = `${fixed(userPosition.longitude)},${fixed(
              userPosition.latitude
            )}-${fixed(station.longitude)},${fixed(station.latitude)}`;

            if (cache[cacheKey]) {
              return { ...station, travelTime: cache[cacheKey] };
            }

            //출발지랑 도착지 비슷한 경우
            if (isSameLocation(userPosition, station)) {
              cache[cacheKey] = 0;
              return { ...station, travelTime: 0 };
            }

            try {
              const time = await getTotalTravelTime(
                { x: userPosition.longitude, y: userPosition.latitude },
                { x: station.longitude, y: station.latitude }
              );
              cache[cacheKey] = time;
              console.log("station:", station);
              return { ...station, travelTime: time };
            } catch (err) {
              console.error("계산 실패", err);
              return { ...station, travelTime: -1 };
            }
          }
        )
      );
      setStationList(updateStations);
    };
    fetchTravelTimes();
  }, [suggestedLocationsData, userPosition]);

  const isActive = selectedStation !== null;

  const clickStationHandler = (station: Station) => {
    if (!hasVoted) {
      setSelectedStation(station);
    }
  };
  const voteHandler = () => {
    if (isActive && selectedStation && !hasVoted) {
      voteDepartLocation(
        {
          scheduleMemberId: scheduleId,
          locationId: selectedStation.locationId,
          scheduleId: Number(scheduleId),
        },
        {
          onSuccess: () => {
            ToastWell("🎉", "투표 완료!");
          },
          onError: (error) => {
            console.error("투표 실패", error);
          },
        }
      );
    }
  };

  return (
    <main className="flex flex-col h-screen w-full mx-auto">
      <div className="hidden sm:block">
        <Header />
      </div>
      <HeaderTop fontColor="black" backward={true}>
        {isPending || !scheduleData ? (
          <SkeletonText />
        ) : (
          scheduleData.data.scheduleName
        )}
      </HeaderTop>

      <div className="pt-[112px] px-5 flex-1 flex flex-col justify-between">
        {/* 상단 설명/이미지 */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col gap-2 text-left pt-12 justify-center">
            {isPending || !scheduleData ? (
              <SkeletonText />
            ) : (
              <h1 className="font-semibold text-xl text-[var(--color-gray)] sm:text-2xl">
                {scheduleData.data.scheduleName}
              </h1>
            )}
            <h1 className="font-semibold text-xl text-[var(--color-black)] sm:text-2xl">
              <span className="text-[var(--color-primary-400)]">모임 지역</span>{" "}
              투표하기
            </h1>
            <h2 className="font-semibold text-base sm:text-xl text-[var(--color-gray-placeholder)]">
              <span className="text-[var(--color-primary-400)]">3개</span>의
              역이 선정되었습니다.
            </h2>
          </div>
          <Image src={takka} alt="vote" width={144} height={216} />
        </div>

        <div className="flex-1 flex flex-col justify-center w-full">
          {stationList.length > 0 && (
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-3"
            >
              {stationList.map((station) => (
                <motion.div
                  key={station.locationName}
                  variants={itemVariants}
                  onClick={() => clickStationHandler(station)}
                  className={hasVoted ? "cursor-not-allowed" : "cursor-pointer"}
                >
                  <SubwayCard
                    station={station}
                    isSelected={
                      selectedStation?.locationName === station.locationName
                    }
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-7 mb-8">
          <PopupMessage>
            출발지 선택이{" "}
            <span className="text-[var(--color-primary-400)]">완료</span>
            되었어요!
          </PopupMessage>
          <Button
            state={isActive ? "default" : "disabled"}
            onClick={voteHandler}
            disabled={hasVoted}
          >
            투표완료
          </Button>
        </div>
      </div>
    </main>
  );
};
export default ElectionSpot;

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
import { useParams, useRouter } from "next/navigation";
import getTotalTravelTime from "@/app/utils/getTotalTravelTime";
import {
  useSuggestedLocations,
  useVoteDepartLocation,
} from "@/lib/api/ElectionApi";
import { useGroupSchedule } from "@/lib/api/scheduleApi";
import ToastWell from "@/components/ui/ToastWell";
import Toast from "@/components/ui/Toast";

const dummyUserData = [
  { latitude: 37.50578860265, longitude: 126.753192450274 },
];

const cache: { [key: string]: number } = {};

const listVariants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
  hidden: {},
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const SkeletonText = () => (
  <div className="h-7 w-1/3 bg-[var(--color-gray-100)] rounded animate-pulse" />
);

const ElectionSpot = () => {
  const userPosition = dummyUserData[0];
  const params = useParams();
  const scheduleId = params.Id as string;
  const { data: suggestedLocationsData, isLoading: isLocationsLoading } =
    useSuggestedLocations(scheduleId);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [stationList, setStationList] = useState<Station[]>([]);
  const { mutate: voteDepartLocation } = useVoteDepartLocation();
  const { data: scheduleData, isPending } = useGroupSchedule(scheduleId);

  const router = useRouter();

  useEffect(() => {
    if (!suggestedLocationsData?.data.suggestedLocations) {
      setStationList([]);
      return;
    }
    const fetchTravelTimes = async () => {
      const updateStations = await Promise.all(
        suggestedLocationsData.data.suggestedLocations.map(
          async (station: Station) => {
            const cacheKey = `${userPosition.longitude},${userPosition.latitude}-${station.longitude},${station.latitude}`;

            if (cache[cacheKey]) {
              return { ...station, travelTime: cache[cacheKey] };
            }

            try {
              const time = await getTotalTravelTime(
                { x: userPosition.longitude, y: userPosition.latitude },
                { x: station.longitude, y: station.latitude }
              );
              cache[cacheKey] = time;
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
  }, [suggestedLocationsData, userPosition.longitude, userPosition.latitude]);
  const isActive = selectedStation !== null;

  const voteHandler = () => {
    if (isActive && selectedStation) {
      voteDepartLocation(
        {
          scheduleMemberId: scheduleId,
          locationId: selectedStation.locationId,
          scheduleId: Number(scheduleId),
        },
        {
          onSuccess: () => {
            setShowPopup(true);
            setTimeout(() => {
              router.push("/election/result");
            }, 1000);
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
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-3"
          >
            {stationList.map((station, idx) => (
              <motion.div
                key={station.locationName}
                variants={itemVariants}
                onClick={() => setSelectedStation(station)}
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
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-7 mb-8">
          <PopupMessage>
            출발지 선택이{" "}
            <span className="text-[var(--color-primary-400)]">완료</span>
            되었어요!
          </PopupMessage>
          <Button
            state={isActive ? "default" : "disabled"}
            onClick={() => {
              if (isActive && selectedStation) {
                voteDepartLocation({
                  scheduleMemberId: scheduleId,
                  locationId: selectedStation.locationId,
                  scheduleId: Number(scheduleId),
                });
              }
            }}
          >
            투표완료
          </Button>
        </div>
      </div>
    </main>
  );
};
export default ElectionSpot;

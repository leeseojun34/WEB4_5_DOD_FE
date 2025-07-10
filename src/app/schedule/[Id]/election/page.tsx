"use client";
import takka from "@/assets/images/rabbit_vote2.png";
import Image from "next/image";
import { Station } from "@/types/station";
import { useState } from "react";
import SubwayCard from "@/components/feature/SubwayCard";
import PopupMessage from "@/components/ui/PopupMessage";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

const dummyData = [
  {
    locationName: "동대문역사문화공원역",
    latitude: 37.4979,
    longitude: 127.0276,
    suggestedMemberId: 1,
    voteCount: 5,
    metroLines: ["2", "4", "5"],
    stationColors: ["#00A84D", "#0052A4", "#996CAC"],
    travelTime: 47,
    noVoteCount: 0,
  },
  {
    locationName: "역삼역",
    latitude: 37.5008,
    longitude: 127.0365,
    suggestedMemberId: 2,
    voteCount: 2,
    metroLines: ["2", "8"],
    stationColors: ["#00A84D", "#E6186C"],
    travelTime: 47,
    noVoteCount: 0,
  },
  {
    locationName: "홍대입구역",
    latitude: 37.5572,
    longitude: 126.9245,
    suggestedMemberId: 3,
    voteCount: 8,
    metroLines: ["2", "5", "경의중앙", "수인분당"],
    stationColors: ["#00A84D", "#996CAC", "#77C4A3", "#FABE00"],
    travelTime: 47,
    noVoteCount: 0,
  },
];

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

const ElectionSpot = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const isActive = selectedId !== null;
  return (
    <>
      <div className="p-5.5 flex flex-col relative min-h-screen">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 text-left  justify-center">
            <h1 className="font-semibold text-xl text-[var(--color-gray)] sm:text-2xl">
              카츠오모이 가는 날
            </h1>
            <h1 className="font-semibold text-xl text-[var(--color-black)] sm:text-2xl">
              <span className="text-[var(--color-primary-400)]">모임 지역</span>{" "}
              투표하기
            </h1>
            <h2 className="font-semibold text-base sm:text-xl text-[var(--color-gray-placeholder)]">
              <span className="text-[var(--color-primary-400)]">3개</span>의
              역이 선정되었습니다.
            </h2>
          </div>
          <Image
            src={takka}
            alt="vote"
            width={144}
            height={216}
            className="mr-5"
          />
        </div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3"
        >
          {dummyData.map((station, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              onClick={() => setSelectedId(station.suggestedMemberId)}
            >
              <SubwayCard
                station={station as Station}
                isSelected={selectedId === station.suggestedMemberId}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="absolute bottom-9 left-0 right-0 w-full px-5 flex flex-col items-center justify-center gap-7 ">
        <PopupMessage>
          출발지 선택이{" "}
          <span className="text-[var(--color-primary-400)]">완료</span>
          되었어요!
        </PopupMessage>
        <Button state={isActive ? "default" : "disabled"}>투표완료</Button>
      </div>
    </>
  );
};
export default ElectionSpot;

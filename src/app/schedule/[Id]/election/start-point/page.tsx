"use client";

import SubwaySearch from "@/components/feature/kakaoMap/SubwaySearch";
import { useEffect, useState } from "react";
import { kakaoSearch } from "@/types/kakaoSearch";
import Map from "@/components/feature/kakaoMap/Map";
import HeaderTop from "@/components/layout/HeaderTop";
import GroupHeader from "@/components/layout/GroupHeader";

const StartPoint = () => {
  const [selectedStation, setSelectedStation] = useState<kakaoSearch | null>(
    null
  );
  const [isSmOrLarger, setIsSmOrLarger] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmOrLarger(window.innerWidth >= 640); // sm: 640px
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <main className="flex flex-col h-screen w-full relative mx-auto">
      {isSmOrLarger ? (
        <GroupHeader
          groupName="카츠오모이 가는날"
          groupCount={3}
          groupIntroduction="배고프다 정말루"
          clickToInvite={() => {}}
        />
      ) : (
        <HeaderTop fontColor="black" backward={true} />
      )}
      <div className="flex-1 w-full ">
        <Map
          longitude={selectedStation ? Number(selectedStation.x) : 127.0106459}
          latitude={selectedStation ? Number(selectedStation.y) : 37.4849424}
        />
      </div>
      <div className="w-full">
        <SubwaySearch onSelectStation={setSelectedStation} />
      </div>
    </main>
  );
};
export default StartPoint;

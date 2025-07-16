"use client";

import SubwaySearch from "@/components/feature/kakaoMap/SubwaySearch";
import { useEffect, useState } from "react";
import { kakaoSearch } from "@/types/kakaoSearch";
import Map from "@/components/feature/kakaoMap/Map";
import HeaderTop from "@/components/layout/HeaderTop";
import GroupHeader from "@/components/layout/GroupHeader";
import BottomSheet from "@/components/ui/BottomSheet";
import Header from "@/components/layout/Header";

const StartPoint = () => {
  const [selectedStation, setSelectedStation] = useState<kakaoSearch | null>(
    null
  );
  const [isSmOrLarger, setIsSmOrLarger] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  const [snapPoints, setSnapPoints] = useState([0.6, 0.33, 0.25]); //모바일 화면 비 값 : 서치결과, 서치, 선택

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmOrLarger(width >= 640); // sm: 640px
      setSnapPoints(
        width >= 640
          ? [0.4, 0.22, 0.16] // PC/태블릿 비율
          : [0.6, 0.33, 0.25] // 모바일 비율
      );
    };
    handleResize(); // 최초 1회 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const selectStationHandler = (station: kakaoSearch) => {
    setSelectedStation(station);
    //console.log(station);
    //setIsSheetOpen(false);
  };
  return (
    <main className="flex flex-col h-screen relative w-full mx-auto">
      <div className="hidden sm:block">
        <Header type="blue" />
      </div>
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
      <BottomSheet
        isOpen={isSheetOpen}
        setIsOpen={setIsSheetOpen}
        snapPoints={snapPoints}
        initialSnap={1}
        className="px-4"
      >
        {(snapTo) => (
          <SubwaySearch
            onSelectStation={selectStationHandler}
            snapTo={snapTo}
          />
        )}
      </BottomSheet>
    </main>
  );
};
export default StartPoint;

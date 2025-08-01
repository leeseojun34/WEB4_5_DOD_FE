"use client";

import SubwaySearch from "@/components/feature/kakaoMap/SubwaySearch";
import { useEffect, useState } from "react";
import { kakaoSearch } from "@/types/kakaoSearch";
import Map from "@/components/feature/kakaoMap/Map";
import BottomSheet from "@/components/ui/BottomSheet";
import Header from "@/components/layout/Header";
import { useParams } from "next/navigation";
import { useGroupSchedule } from "@/lib/api/scheduleApi";
import GlobalLoading from "@/app/loading";
import BlurredChevronHeader from "@/components/layout/BlurredChevronHeader";
import { useRouter } from "next/navigation";
import useAuthRequired from "../feature/schedule/hooks/useAuthRequired";
import ToastWell from "../ui/ToastWell";

const CreateDepartLocationPage = () => {
  const [selectedStation, setSelectedStation] = useState<kakaoSearch | null>(
    null
  );
  const [isSmOrLarger, setIsSmOrLarger] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  const [snapPoints, setSnapPoints] = useState([0.6, 0.33, 0.25]); //모바일 화면 비 값 : 서치결과, 서치, 선택
  const { isAuthenticated, isLoading, user } = useAuthRequired();
  const userId = user?.id;
  const params = useParams();
  const scheduleId = params.id as string;
  const { data: scheduleData, isPending } = useGroupSchedule(scheduleId);
  const router = useRouter();
  useEffect(() => {
    if (isLoading) return;
    if (!scheduleData?.data?.members || !userId) return;

    const isUserInSchedule = scheduleData.data.members.some(
      (member: MemberType) => member.id === userId
    );

    if (!isUserInSchedule) {
      ToastWell("🚫", "해당 일정에 포함된 멤버가 아닙니다.");
      router.replace("/");
    }
  }, [isLoading, scheduleData, userId, router]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmOrLarger(width >= 640);
      setSnapPoints(width >= 640 ? [0.5, 0.34, 0.26] : [0.72, 0.45, 0.25]);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isPending) return;

    if (!scheduleData || !scheduleData.data || !userId) return;
    const isRegistered = scheduleData.data.members.some(
      (member: MemberType) =>
        member.id === userId && !!member.departLocationName
    );
    //console.log(isRegistered);
    if (isRegistered) {
      router.replace("../election/wait");
    }
  }, [scheduleData, userId, isPending, router]);

  const selectStationHandler = (station: kakaoSearch) => {
    setSelectedStation(station);
    //console.log(station);
  };
  if (isLoading || isPending || !isAuthenticated) {
    return <GlobalLoading />;
  }
  return (
    <main className="flex flex-col h-screen relative w-full mx-auto">
      <div className="hidden sm:block">
        {" "}
        <Header type="blue" />{" "}
      </div>
      {isSmOrLarger ? "" : <BlurredChevronHeader />}

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
        hideBackdrop={true}
      >
        {(snapTo) => (
          <SubwaySearch
            onSelectStation={selectStationHandler}
            snapTo={snapTo}
            scheduleId={scheduleId}
            userId={userId!}
          />
        )}
      </BottomSheet>
    </main>
  );
};
export default CreateDepartLocationPage;

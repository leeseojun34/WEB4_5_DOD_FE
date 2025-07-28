"use client";
import Map from "@/components/feature/kakaoMap/Map";
import GroupHeader from "@/components/layout/GroupHeader";
import Header from "@/components/layout/Header";
import HeaderTop from "@/components/layout/HeaderTop";
import PopupMessage from "@/components/ui/PopupMessage";
import ShareButton from "@/components/ui/ShareButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSuggestedLocations } from "@/lib/api/ElectionApi";

const ElectionWait = () => {
  const [isSmOrLarger, setIsSmOrLarger] = useState(false);
  const route = useRouter();
  const [noVoteCount, setNoVoteCount] = useState<number | null>(null);
  const [noDepartLocationCount, setNoDepartLocationCount] = useState<
    number | null
  >(null);
  const params = useParams();
  const scheduleId = params.Id as string;
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmOrLarger(window.innerWidth >= 640); // sm: 640px
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    const fetchSuggestedLocations = async () => {
      try {
        const response = await getSuggestedLocations(scheduleId); // 스케줄 ID 적절히 변경
        setNoVoteCount(response.data.noVoteCount);
        setNoDepartLocationCount(response.data.noDepartLocationCount);
      } catch (error) {
        console.error("중간 장소 후보 조회 실패", error);
      }
    };
    if (scheduleId) {
      fetchSuggestedLocations();
    }
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [scheduleId]);
  return (
    <main className="flex flex-col h-screen w-full relative">
      <div className="hidden sm:block">
        <Header type="blue" />
      </div>
      {/* {isSmOrLarger ? (
        <GroupHeader
          groupName="카츠오모이 가는날"
          groupCount={3}
          groupIntroduction="배고프다 정말루"
          clickToInvite={() => {}}
        />
      ) : (
        <HeaderTop fontColor="black" backward={true} />
      )} */}
      {/* 지도 1024px*/}
      <div className="flex-1 w-full flex justify-center">
        <div className="w-full max-w-[1024px]">
          <Map latitude={37.5058098} longitude={126.7531869} />
        </div>
      </div>
      <div className="fixed bottom-9 left-0 right-0 w-full flex justify-center z-10">
        <div className="w-full max-w-[740px] mx-auto flex flex-col items-center gap-4 px-5">
          {noDepartLocationCount === 0 ? (
            <>
              <PopupMessage>
                출발지 위치 선택이
                <span className="text-[var(--color-primary-400)]"> 완료</span>
                되었어요!
              </PopupMessage>
              <ShareButton
                title="중간 장소 투표하러 가기"
                description="어느 역이 중간 지점인지 확인해보세요."
                mode="vote"
                onClick={() => {
                  route.push("../election");
                }}
              />
            </>
          ) : (
            <>
              <PopupMessage>
                <span className="text-[var(--color-primary-400)]">
                  {noDepartLocationCount}명
                </span>
                의 친구들이 아직 선택하지 않았어요.
              </PopupMessage>
              <ShareButton
                title="투표 링크 공유하기"
                description="빠르게 장소를 지정할 수 있도록 링크를 보내주세요"
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default ElectionWait;

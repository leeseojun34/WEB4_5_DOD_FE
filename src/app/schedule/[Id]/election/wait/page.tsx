"use client";
import Map from "@/components/feature/kakaoMap/Map";
import HeaderTop from "@/components/layout/HeaderTop";
import PopupMessage from "@/components/ui/PopupMessage";
import ShareButton from "@/components/ui/ShareButton";

const ElectionWait = () => {
  return (
    <main className="flex flex-col h-screen w-full relative">
      <div className="w-full mx-auto">
        <HeaderTop fontColor="black" backward={true} />
      </div>
      {/* 지도 1024px*/}
      <div className="flex-1 w-full flex justify-center">
        <div className="w-full max-w-[1024px]">
          <Map latitude={37.5058098} longitude={126.7531869} />
        </div>
      </div>
      <div className="fixed bottom-9 left-0 right-0 w-full flex justify-center z-10">
        <div className="w-full max-w-[740px] mx-auto flex flex-col items-center gap-4 px-5">
          <PopupMessage>
            <span className="text-[var(--color-primary-400)]">2명</span>의
            친구들이 아직 선택하지 않았어요.
          </PopupMessage>
          <ShareButton
            title="투표 링크 공유하기"
            description="빠르게 장소를 지정할 수 있도록 링크를 보내주세요"
          />
        </div>
      </div>
    </main>
  );
};

export default ElectionWait;

"use client";
import Map from "@/components/feature/Map";
import PopupMessage from "@/components/ui/PopupMessage";
import ShareButton from "@/components/ui/ShareButton";

const ElectionWait = () => {
  return (
    <main className="flex flex-col min-h-screen relative pt-8 max-w-[740px] mx-auto">
      <div className="relative w-full h-[896px]">
        <Map latitude={37.5058098} longitude={126.7531869} />
      </div>
      <div className="w-full flex flex-col items-center gap-4 justify-center fixed bottom-9 left-0 px-5 z-10">
        <PopupMessage>
          <span className="text-[var(--color-primary-400)]">2명</span>의
          친구들이 아직 선택하지 않았어요.
        </PopupMessage>
        <ShareButton />
      </div>
    </main>
  );
};

export default ElectionWait;

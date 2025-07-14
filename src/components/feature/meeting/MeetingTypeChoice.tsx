"use client";
import Tip from "@/components/ui/Tip";
import MeetingTypeOptions from "./MeetingTypeOptions";
import { Button } from "@/components/ui/Button";
import HeaderTop from "@/components/layout/HeaderTop";
import Header from "@/components/layout/Header";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MeetingTypeChoice = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<"once" | "recurring">(
    "once"
  );

  const handleNext = () => {
    if (selectedType === "once") {
      router.push("/schedule/create");
    } else {
      router.push("/group/create");
    }
  };
  return (
    <>
      <section>
        <div className="hidden sm:block">
          <Header />
        </div>
        <HeaderTop />
        <div className="flex flex-col  max-h-screen relative max-w-[740px] mx-auto px-5">
          <main className="flex flex-col gap-8 relative pt-25 sm:pt-40 min-h-screen box-border">
            <h1 className="text-xl font-bold">모임 유형을 선택해주세요</h1>
            <MeetingTypeOptions
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
            <Tip>
              한번 모임은 그날 딱 한 번 만날 때 좋아요.
              <br />
              자주 모임은 그룹 안에서 소모임을 꾸리고 여러번 만날 수 있어요.
            </Tip>
            <div className="w-full flex items-center justify-center absolute bottom-9 left-0">
              <Button state="default" onClick={handleNext}>
                다음
              </Button>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};
export default MeetingTypeChoice;

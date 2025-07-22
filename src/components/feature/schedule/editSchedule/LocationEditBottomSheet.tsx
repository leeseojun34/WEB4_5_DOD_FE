import BottomSheet from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ShareButton from "@/components/ui/ShareButton";
import { useEffect, useState } from "react";
import BottomSheetHeader from "@/components/layout/BottomSheetHeader";
import { useRouter } from "next/navigation";
import FinalDestinationSearch from "./FinalDestinationSearch";

interface LocationEditBottomSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const LocationEditBottomSheet = ({
  isOpen,
  setIsOpen,
}: LocationEditBottomSheetProps) => {
  const [snapPoints, setSnapPoints] = useState([0.6, 0.33, 0.25]);
  const midPointStation = "2호선 건대입구역";
  const router = useRouter();

  const handleClickRouter = () => {
    router.push("/schedule/1/election/start");
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setSnapPoints(width >= 640 ? [0.4, 0.22, 0.16] : [0.9, 0.7, 0.5]);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <BottomSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        snapPoints={snapPoints}
        initialSnap={1}
        hideBackdrop={true}
      >
        {() => (
          <div className="min-w-[375px] w-full max-w-185 flex flex-col items-center px-5 mx-auto pt-3 gap-8">
            <BottomSheetHeader setIsOpen={setIsOpen} title="모임 장소 정하기" />
            <ShareButton
              title="만남 장소 정하기 어려우신가요?"
              description="모임인원들의 중간 지점을 찾아드려요"
              mode="help"
              color="var(--color-primary-100)"
              borderColor="var(--color-primary-400)"
              onClick={handleClickRouter}
            ></ShareButton>

            <FinalDestinationSearch />

            {midPointStation && (
              <div className="w-full flex flex-col gap-2">
                <Input
                  label="중간 장소"
                  fullWidth={true}
                  value={midPointStation}
                  readOnly
                  disabled
                />
              </div>
            )}
            <div className="h-20"></div>
          </div>
        )}
      </BottomSheet>

      {isOpen && (
        <div className="fixed bottom-9 left-0 right-0 px-5 z-[99999]">
          <div className="min-w-[375px] w-full max-w-185 mx-auto">
            <Button>저장하기</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationEditBottomSheet;

import BottomSheet from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ShareButton from "@/components/ui/ShareButton";
import { Search } from "lucide-react";
import useMediaQuery from "../hooks/useMediaQuery";
import { ChangeEvent, useState } from "react";
import BottomSheetHeader from "@/components/layout/BottomSheetHeader";
import { useRouter } from "next/navigation";

interface LocationEditBottomSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const LocationEditBottomSheet = ({
  isOpen,
  setIsOpen,
}: LocationEditBottomSheetProps) => {
  const [inputValue, setInputValue] = useState("");
  const isMobile = useMediaQuery("(min-height: 935px)");
  const snapPoints = isMobile ? [0.5] : [0.6];
  const midPointStation = "2호선 건대입구역";
  const router = useRouter();
  // const midPointStation = "";

  const handleClickRouter = () => {
    router.push("/schedule/1/election/start");
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      snapPoints={snapPoints}
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
          <Input
            label="모임 장소"
            icon={
              <Search className="w-4 h-4 text-[color:var(--color-gray-placeholder)]" />
            }
            fullWidth={true}
            placeholder="장소를 검색하세요"
            value={inputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
          />
          {midPointStation && (
            <div className="w-full flex flex-col gap-2">
              <div className="flex justify-between">
                <div className="text-sm font-medium text-[color:var(--color-black)]">
                  중간 장소
                </div>
                <button className="text-[10px] font-medium text-[color:var(--color-gray)] cursor-pointer">
                  투표 다시하기
                </button>
              </div>
              <Input
                fullWidth={true}
                value={midPointStation}
                readOnly
                disabled
              />
            </div>
          )}

          <Button>저장하기</Button>
        </div>
      )}
    </BottomSheet>
  );
};

export default LocationEditBottomSheet;

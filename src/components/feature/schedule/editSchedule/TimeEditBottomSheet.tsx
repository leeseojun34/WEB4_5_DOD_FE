import BottomSheet from "@/components/ui/BottomSheet";
import TimeSelector from "./TimeSelector";
import { Dispatch, SetStateAction } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import BottomSheetHeader from "@/components/layout/BottomSheetHeader";

interface TimeEditBottomSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
  onComplete: () => void;
  setStartTime: (str: string) => void;
  setEndTime: (str: string) => void;
}

const TimeEditBottomSheet = ({
  isOpen,
  setIsOpen,
  selectedDate,
  setSelectedDate,
  onComplete,
  setStartTime,
  setEndTime,
}: TimeEditBottomSheetProps) => {
  const isMobile = useMediaQuery("(min-width: 640px)");
  const snapPoints = isMobile ? [0.55] : [0.9];
  return (
    <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen} snapPoints={snapPoints}>
      {() => (
        <div className="w-[375px] flex flex-col items-center px-5 mx-auto pt-3 gap-8">
          <BottomSheetHeader setIsOpen={setIsOpen} title="모임 시간 수정" />
          <TimeSelector
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            onComplete={onComplete}
          />
        </div>
      )}
    </BottomSheet>
  );
};

export default TimeEditBottomSheet;

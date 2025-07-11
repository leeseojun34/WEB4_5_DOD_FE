import BottomSheet from "@/components/ui/BottomSheet";
import { X } from "lucide-react";
import TimeSelector from "./TimeSelector";
import { Dispatch, SetStateAction } from "react";

interface TimeEditBottomSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
  onComplete: () => void;
}

const TimeEditBottomSheet = ({
  isOpen,
  setIsOpen,
  selectedDate,
  setSelectedDate,
  onComplete,
}: TimeEditBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen} snapPoints={[0.55]}>
      {() => (
        <div className="w-[375px] flex flex-col items-center px-5 mx-auto pt-3 gap-8">
          <div className="flex justify-between w-full">
            <X className="invisible w-5 h-5" />
            <div className="font-semibold text-base text-[color:var(--color-black)]">
              모임 시간 수정
            </div>
            <X
              className="w-5 h-5 text-[color:var(--color-black)] cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <TimeSelector
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            onComplete={onComplete}
          />
        </div>
      )}
    </BottomSheet>
  );
};

export default TimeEditBottomSheet;

import BottomSheet from "@/components/ui/BottomSheet";
import { X } from "lucide-react";

interface LocationEditBottomSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const LocationEditBottomSheet = ({
  isOpen,
  setIsOpen,
}: LocationEditBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen} snapPoints={[0.9]}>
      {() => (
        <div className="w-[375px] flex flex-col items-center px-5 mx-auto pt-3 gap-8">
          <div className="flex justify-between w-full">
            <X className="invisible w-5 h-5" />
            <div className="font-semibold text-base text-[color:var(--color-black)]">
              온라인 회의장 등록/편집
            </div>
            <X
              className="w-5 h-5 text-[color:var(--color-black)] cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </BottomSheet>
  );
};

export default LocationEditBottomSheet;

import { X } from "lucide-react";

interface BottomSheetHeaderProps {
  setIsOpen: (open: boolean) => void;
  title: string;
  showCloseButton?: boolean;
}

const BottomSheetHeader = ({
  setIsOpen,
  title,
  showCloseButton = true,
}: BottomSheetHeaderProps) => {
  return (
    <div className="flex justify-between w-full">
      <X className="invisible w-5 h-5" />
      <div className="font-semibold text-base text-[color:var(--color-black)]">
        {title}
      </div>
      <X
        className={`w-5 h-5 text-[color:var(--color-black)] cursor-pointer ${
          !showCloseButton && "invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />
    </div>
  );
};

export default BottomSheetHeader;

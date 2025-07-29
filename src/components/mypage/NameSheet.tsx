import { X } from "lucide-react";
import BottomSheet from "../ui/BottomSheet";
import { Button } from "../ui/Button";
import Input from "../ui/Input";
import { ChangeEvent } from "react";

type NameSheetType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  text: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
};

function NameSheet({
  isOpen,
  setIsOpen,
  text,
  onChange,
  onSave,
}: NameSheetType) {
  return (
    <BottomSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      initialSnap={0}
      snapPoints={[0.45]}>
      {() => (
        <div className="w-full flex flex-col relative  px-5 gap-8 pb-12 h-[calc(100vh-68%)]">
          <div className="flex justify-between items-center px-5">
            <X className="invisible" />
            <span className="text-base font-medium mt-3">이름 수정</span>
            <X
              size={20}
              onClick={() => setIsOpen(false)}
              className="text-[var(--color-black)] cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-4 w-full max-w-[700px] mx-auto">
            <Input
              label="이름"
              value={text}
              maxLength={10}
              onChange={onChange}
              placeholder="이름을 입력해주세요."
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.nativeEvent.isComposing) return;
                if (e.key === "Enter") {
                  e.preventDefault();
                  // console.log("이름 수정 클릭, enter key pressed");
                  onSave();
                  setIsOpen(false);
                }
              }}
            />
          </div>
          <div className="w-full h-12 items-center flex justify-center max-w-[700px] mx-auto">
            <Button
              className="h-full flex items-center justify-center"
              state={text.trim() === "" ? "disabled" : "default"}
              onClick={() => {
                // console.log("이름 수정 클릭");
                onSave();
                setIsOpen(false);
              }}>
              저장하기
            </Button>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}
export default NameSheet;

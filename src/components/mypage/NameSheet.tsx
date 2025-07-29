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
  const snapPoints = [0.6, 0.4, 0.35];
  return (
    <>
      <BottomSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        snapPoints={snapPoints}
        initialSnap={1}
      >
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
          </div>
        )}
      </BottomSheet>
      {isOpen && (
        <div className="fixed bottom-9 left-0 right-0 px-5 z-[99999]">
          <div className="min-w-[335px] w-full max-w-185 mx-auto flex justify-center items-center">
            <Button
              state={text.trim() === "" ? "disabled" : "default"}
              onClick={() => {
                // console.log("이름 수정 클릭");
                onSave();
                setIsOpen(false);
              }}
            >
              저장하기
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
export default NameSheet;

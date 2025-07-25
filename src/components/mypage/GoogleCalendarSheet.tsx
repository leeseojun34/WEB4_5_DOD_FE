import { X } from "lucide-react";
import BottomSheet from "../ui/BottomSheet";
import { Button } from "../ui/Button";
import Input from "../ui/Input";
import { ChangeEvent } from "react";
import Tip from "../ui/Tip";
// import useMediaQuery from "../feature/schedule/hooks/useMediaQuery";

type GoogleCalendarSheetType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  text: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
};

function GoogleCalenaderSheet({
  isOpen,
  setIsOpen,
  text,
  onChange,
  onSave,
}: GoogleCalendarSheetType) {
  // const isMobile = useMediaQuery("(min-height: 935px)");
  // const snapPoints = isMobile ? [0.55] : [0.75];
  return (
    <BottomSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      initialSnap={0}
      snapPoints={[0.8]}>
      {() => (
        <div className="w-full flex flex-col relative px-5 gap-8 pb-12 h-[calc(100vh-35%)]">
          <div className="flex justify-between items-center px-5">
            <X className="invisible" />
            <span className="text-base font-medium mt-3">
              구글 캘린더 ID 등록
            </span>
            <X
              size={20}
              onClick={() => setIsOpen(false)}
              className="text-[var(--color-black)] cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-4 w-full max-w-[700px] mx-auto">
            <Input
              label="구글캘린더ID"
              value={text}
              // maxLength={10}
              onChange={onChange}
              placeholder="구글캘린더 ID를 입력해주세요."
            />
          </div>
          <div className="flex flex-col gap-4 w-full max-w-[700px] mx-auto">
            <Tip>
              연결해서 사용하고 싶은 캘린더 ID를 복사해서 붙여 넣어주세요.
              <br />
              <br />
              <strong>[복사 경로]</strong>
              <br />
              구글 캘린더 → 설정 → 내 캘린더의 설정 → 연결하고 싶은 캘린더 선택
              → 캘린더 통합/캘린더 ID 복사
            </Tip>
          </div>
          <div
            className="flex absolute justify-center items-center min-w-[375px] left-1/2
-translate-x-1/2 w-full bottom-9 px-5">
            <Button
              onClick={() => {
                onSave();
                setIsOpen(false);
              }}>
              등록하기
            </Button>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}
export default GoogleCalenaderSheet;

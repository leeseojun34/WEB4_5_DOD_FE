"use client";

import { X } from "lucide-react";
import BottomSheet from "../ui/BottomSheet";
import { Button } from "../ui/Button";
import Input from "../ui/Input";
import { ChangeEvent, useEffect, useState } from "react";
import Tip from "../ui/Tip";

type GoogleCalendarSheetType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  text: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
};

export default function GoogleCalendarSheet({
  isOpen,
  setIsOpen,
  text,
  onChange,
  onSave,
}: GoogleCalendarSheetType) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const snapHeight = isMobile ? 0.8 : 0.55;

  const contentStyle = {
    height: isMobile ? "calc(100vh - 10%)" : "calc(100vh - 35%)",
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      initialSnap={0}
      snapPoints={[snapHeight]}>
      {() => (
        <div
          className="w-full flex flex-col relative px-5 gap-8 pb-12"
          style={contentStyle}>
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

          <div className="w-full max-w-[700px] mx-auto flex flex-col gap-8">
            <Input
              label="구글캘린더ID"
              className="flex flex-col gap-2 w-full"
              value={text}
              onChange={onChange}
              placeholder="구글캘린더 ID를 입력해주세요."
            />

            <Tip>
              연결해서 사용하고 싶은 캘린더 ID를 복사해서 붙여 넣어주세요.
              <br />
              <br />
              <strong>[복사 경로]</strong>
              <br />
              구글 캘린더 → 설정 → 내 캘린더의 설정 → 연결하고 싶은 캘린더 선택
              → 캘린더 통합/캘린더 ID 복사
            </Tip>

            <Button
              state={text ? "default" : "disabled"}
              className="w-full h-12"
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

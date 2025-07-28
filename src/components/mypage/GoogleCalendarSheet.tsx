"use client";

import { X } from "lucide-react";
import BottomSheet from "../ui/BottomSheet";
import { Button } from "../ui/Button";
import Input from "../ui/Input";
import { ChangeEvent, useEffect, useState } from "react";
import Tip from "../ui/Tip";
import { useDeleteCalendarId } from "@/lib/api/authApi";
import AlertBox from "../ui/AlertBox";

type GoogleCalendarSheetType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  text: string; // 최초 값
  hasGoogleCalendarId: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSave: (value: string) => void;
};

export default function GoogleCalendarSheet({
  isOpen,
  setIsOpen,
  text,
  hasGoogleCalendarId,
  onChange,
  onSave,
}: GoogleCalendarSheetType) {
  const [inputValue, setInputValue] = useState(text);
  const [registered, setRegistered] = useState(hasGoogleCalendarId); // ✅ 내부 등록 여부 상태

  const isValidCalendarId = (id: string) =>
    /^[a-zA-Z0-9]+@(gmail\.com|group\.calendar\.google\.com)$/.test(id);

  const isValidForm = isValidCalendarId(inputValue);
  const shouldShowError =
    !isValidForm && inputValue.length > 0 && !hasGoogleCalendarId;
  const isInputDisabled = registered || hasGoogleCalendarId;
  const isButtonDisabled = !isValidForm || registered || hasGoogleCalendarId;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setInputValue(text);
      setRegistered(hasGoogleCalendarId);
    }
  }, [isOpen, text, hasGoogleCalendarId]);

  const snapHeight = isMobile ? 0.8 : 0.55;
  const contentStyle = {
    height: isMobile ? "calc(100vh - 10%)" : "calc(100vh - 35%)",
  };

  const deleteMutation = useDeleteCalendarId();

  const handleDelete = () => {
    deleteMutation.mutate();
    setRegistered(false);
    setIsOpen(false);
    handleClose();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  const handleClose = () => {
    setInputValue("");
    setIsOpen(false);
  };

  const handleSave = () => {
    onSave(inputValue);
    setRegistered(true);
    handleClose();
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
              onClick={handleClose}
              className="text-[var(--color-black)] cursor-pointer"
            />
          </div>

          <div className="w-full max-w-[700px] mx-auto flex flex-col gap-8">
            <div className="w-full flex flex-col gap-1">
              <Input
                label="구글캘린더ID"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="구글캘린더 ID를 입력해주세요."
                disabled={isInputDisabled}
                className={`w-full ${
                  isInputDisabled
                    ? "opacity-50 pointer-events-none disabled:bg-[var(--color-gray-placeholder)]"
                    : ""
                }`}
              />
              {shouldShowError && (
                <p className="text-xs text-[var(--color-red)] ml-2">
                  *구글 캘린더 ID는 gmail.com 또는 group.calendar.google.com
                  형식이어야 합니다.
                </p>
              )}
            </div>

            {!hasGoogleCalendarId && (
              <Tip>
                연결해서 사용하고 싶은 캘린더 ID를 복사해서 붙여 넣어주세요.
                <br />
                <br />
                <strong>[복사 경로]</strong>
                <br />
                구글 캘린더 → 설정 → 내 캘린더의 설정 → 연결하고 싶은 캘린더
                선택 → 캘린더 통합 / 캘린더 ID 복사
              </Tip>
            )}

            {inputValue && hasGoogleCalendarId && (
              <div className="flex justify-center items-center">
                <AlertBox
                  actionHandler={handleDelete}
                  content="삭제하시겠습니까?"
                  cancel="취소"
                  action="삭제하기">
                  <span className="font-light text-xs text-[var(--color-gray-placeholder)] hover:text-[var(--color-primary-400)] cursor-pointer">
                    삭제하기
                  </span>
                </AlertBox>
              </div>
            )}

            <Button
              state={isButtonDisabled ? "disabled" : "default"}
              className="w-full h-12"
              onClick={handleSave}>
              등록하기
            </Button>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}

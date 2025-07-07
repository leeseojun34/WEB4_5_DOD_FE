"use client";

import { useState } from "react";
import BottomSheet from "../ui/BottomSheet";
import { Search } from "lucide-react";
import Input from "@/components/ui/Input";
const Landing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [errorText, setErrorText] = useState("");

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="font-tt-together text-[var(--color-red)]"
      >
        Open sheet
      </button>

      <div className="p-4 w-[335px] flex flex-col gap-6">
        <Input
          label="기본 Input"
          placeholder="placeholder"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Input
          placeholder="placeholder"
          icon={<Search className="w-4 h-4 " />}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Input
          label="멀티라인"
          isTextarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="placeholder"
          maxLength={50}
        />

        <Input
          label="에러 Input"
          placeholder="입력하세요"
          value={errorText}
          onChange={(e) => {
            if (e.target.value.length <= 10) {
              setErrorText(e.target.value);
            }
          }}
          maxLength={10}
          error="최대 글자 수 초과"
        />
      </div>

      <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="p-4">Hello from the bottom sheet</div>
      </BottomSheet>
    </>
  );
};
export default Landing;

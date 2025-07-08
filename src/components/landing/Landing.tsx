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

      <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="p-4">Hello from the bottom sheet</div>
      </BottomSheet>
    </>
  );
};
export default Landing;

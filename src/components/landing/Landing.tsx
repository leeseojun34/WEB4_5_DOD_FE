"use client";

import { useState } from "react";
import BottomSheet from "../ui/BottomSheet";
const Landing = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="font-tt-together">
        Open sheet
      </button>
      <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="p-4">Hello from the bottom sheet</div>
      </BottomSheet>
    </>
  );
};
export default Landing;

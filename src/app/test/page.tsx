"use client";

import { useState } from "react";

import BottomSheet from "@/components/ui/BottomSheet";
import Schedule from "@/components/feature/Schedule";

const TestPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>open</button>
      <BottomSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        snapPoints={[0.9]}
        disableDrag={true}
      >
        {() => (
          <>
            <button onClick={() => setIsOpen(false)} className="cursor-pointer">
              x
            </button>
            <div className="w-full h-[90%] overflow-y-auto">
              <div>
                <Schedule />
              </div>
              <div className="w-full h-[10%] flex justify-center items-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer w-full h-full bg-blue-500 rounded-4xl text-white"
                >
                  <span>완료</span>
                </button>
              </div>
            </div>
          </>
        )}
      </BottomSheet>
    </div>
  );
};
export default TestPage;

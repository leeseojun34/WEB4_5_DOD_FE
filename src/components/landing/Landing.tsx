"use client";

import { useState } from "react";
import { Sheet } from "react-modal-sheet";
const Landing = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open sheet</button>
      <Sheet
        snapPoints={[300]}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Sheet.Container style={{ borderRadius: "20px 20px 0 0" }}>
          <Sheet.Header />
          <Sheet.Content>
            <div className="p-4">Hello from the bottom sheet</div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
};
export default Landing;

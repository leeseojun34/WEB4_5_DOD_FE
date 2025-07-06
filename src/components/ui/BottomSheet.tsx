"use client";

import { Sheet } from "react-modal-sheet";
const BottomSheet = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}) => {
  return (
    <>
      <Sheet
        snapPoints={[300]}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Sheet.Container style={{ borderRadius: "20px 20px 0 0" }}>
          <Sheet.Header />
          <Sheet.Content>{children}</Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
};
export default BottomSheet;

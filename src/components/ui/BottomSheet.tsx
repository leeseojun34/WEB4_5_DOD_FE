"use client";

import { Sheet } from "react-modal-sheet";
/**
 * @param isOpen - 바텀시트 열림 여부
 * @param setIsOpen - 바텀시트 열림 여부 설정
 * @param snapPoints - 바텀시트 높이 조절 - 숫자가 클 수록 높이 올라옴
 * @param children - 바텀시트 내용
 *
 * 별도의 props가 더 있지만 필요없을거 같아서 제외 함
 * @returns 바텀시트 컴포넌트
 */
const BottomSheet = ({
  isOpen,
  setIsOpen,
  snapPoints = 400,
  children,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  snapPoints?: number;
  children: React.ReactNode;
}) => {
  return (
    <>
      <Sheet
        snapPoints={[snapPoints]}
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

"use client";

import { Sheet, SheetRef } from "react-modal-sheet";
import { useRef } from "react";
/**
 * @param isOpen - 바텀시트 열림 여부 - boolean
 * @param setIsOpen - 바텀시트 열림 여부 설정 - (isOpen 변경 함수)
 * @param children - 바텀시트 내용 - (snapTo 함수를 인자로 받는 함수)
 * @param snapPoints - 바텀시트 높이 조절 위치 - number[] default: [0.8, 0.4, 0.2] optional
 * @param initialSnap - 바텀시트 초기 위치 - number default: 0 optional
 * @param className - 바텀시트 컴포넌트 스타일 - string optional
 *
 * childrenFunction: snapTo - 바텀시트 높이 조절 함수 - snapTo(i: number) => void (i: 0 ~ snapPoints.length - 1)
 *
 * @returns 바텀시트 컴포넌트
 */

interface BottomSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: (snapTo?: (i: number) => void) => React.ReactNode;
  snapPoints?: number[];
  initialSnap?: number;
  className?: string;
  disableDrag?: boolean;
}

const BottomSheet = ({
  isOpen,
  setIsOpen,
  children,
  disableDrag = false,
  snapPoints = [0.8, 0.4, 0.2],
  initialSnap = 0,
  className = "",
}: BottomSheetProps) => {
  const sheetRef = useRef<SheetRef>(null);
  const snapTo = (i: number) => {
    if (typeof window === "undefined") return;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) return;

    sheetRef.current?.snapTo(i);
  };

  return (
    <>
      <Sheet
        ref={sheetRef}
        snapPoints={snapPoints}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialSnap={initialSnap}
        className={`${className} w-full md:max-w-5xl md:mx-auto`}
        disableDrag={disableDrag}
      >
        <Sheet.Container style={{ borderRadius: "20px 20px 0 0" }}>
          <Sheet.Header />
          <Sheet.Content>{children(snapTo)}</Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
};
export default BottomSheet;

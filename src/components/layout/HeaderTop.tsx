"use client";

import { ChevronLeft, Ellipsis, Plus, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";

const headerStyle =
  "w-full flex items-center justify-between px-5 pt-11 min-h-7";
const fontStyle = "text-lg text-[color:var(--color-black)]";
const fontStyleWhite = "text-lg text-[color:var(--color-white)]";

type HeaderTopProps = {
  fontColor?: "black" | "white";
  children?: React.ReactNode;
  backward?: boolean;
  icon?: "plus" | "pen" | "ellipsis" | "";
  clickPlusHandler?: () => void;
  clickPenHandler?: () => void;
  clickEllipsisHandler?: () => void;
};

const HeaderTop = ({
  fontColor = "black",
  children,
  backward = true,
  icon = "",
  clickPlusHandler,
  clickPenHandler,
  clickEllipsisHandler,
}: HeaderTopProps) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <>
      {/*
         props:
          fontColor : 폰트 색상 (black, white)
          children : 헤더에 표시할 텍스트
          backward : 뒤로가기 아이콘 표시 여부 (boolean)
          icon : 아이콘 종류 (plus, pen, ellipsis)
          clickPlusHandler : plus 클릭 핸들러
          clickPenHandler : pen 아이콘 클릭 핸들러
          clickEllipsisHandler : ellipsis 아이콘 클릭 핸들러
      */}
      <div className={`${headerStyle} bg-transparent relative z-10`}>
        <span onClick={handleBack} className="cursor-pointer">
          <ChevronLeft
            color={
              fontColor === "black"
                ? "var(--color-black)"
                : "var(--color-white)"
            }
            size={20}
            className={backward ? "" : "invisible"}
          />
        </span>
        <span className={fontColor === "black" ? fontStyle : fontStyleWhite}>
          {children}
        </span>
        {icon === "plus" && (
          <span onClick={clickPlusHandler} className="cursor-pointer">
            <Plus
              color={
                fontColor === "black"
                  ? "var(--color-black)"
                  : "var(--color-white)"
              }
              size={16}
            />
          </span>
        )}
        {icon === "pen" && (
          <span onClick={clickPenHandler} className="cursor-pointer">
            <SquarePen
              color={
                fontColor === "black"
                  ? "var(--color-black)"
                  : "var(--color-white)"
              }
              size={16}
            />
          </span>
        )}
        {icon === "ellipsis" && (
          <span onClick={clickEllipsisHandler} className="cursor-pointer">
            <Ellipsis
              color={
                fontColor === "black"
                  ? "var(--color-black)"
                  : "var(--color-white)"
              }
              size={16}
            />
          </span>
        )}
        {icon === "" && (
          <span>
            <SquarePen size={16} className="invisible" />
          </span>
        )}
      </div>
    </>
  );
};
export default HeaderTop;

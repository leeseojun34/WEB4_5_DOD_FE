import { ChevronLeft, Plus, SquarePen } from "lucide-react";

const headerStyle = "w-full flex items-center justify-between px-5 ";
const fontStyle = "text-lg text-black";
const fontStyleWhite = "text-lg text-white";
const fontStyleIntro = "text-medium text-[#eeeeee]";
const tagStyle =
  "flex items-center justify-center gap-1 bg-[#FFFFFF30] rounded-sm px-2 py-0.5 text-xs text-white cursor-pointer";
const HeaderTop = ({
  fontColor = "black",
  children,
  backward = true,
  icon,
}: {
  fontColor: string;
  children: React.ReactNode;
  backward: boolean;
  icon?: string;
}) => {
  return (
    <>
      {/*
         props:
          fontColor : 폰트 색상 (black, white)
          backward : 뒤로가기 아이콘 표시 여부 (boolean)
          icon : 아이콘 종류 (plus, pen)
          children : 헤더에 표시할 텍스트
      */}
      <div className={headerStyle}>
        <span>
          <ChevronLeft
            color={fontColor === "black" ? "black" : "white"}
            size={16}
            className={backward ? "" : "invisible"}
          />
        </span>
        <span className={fontColor === "black" ? fontStyle : fontStyleWhite}>
          {children}
        </span>
        {icon === "plus" && (
          <span>
            <Plus color={fontColor === "black" ? "black" : "white"} size={16} />
          </span>
        )}
        {icon === "pen" && (
          <span>
            <SquarePen
              color={fontColor === "black" ? "black" : "white"}
              size={16}
            />
          </span>
        )}
      </div>
    </>
  );
};
export default HeaderTop;

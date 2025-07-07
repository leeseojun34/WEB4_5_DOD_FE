import { ChevronLeft, Plus, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";

const headerStyle = "w-full flex items-center justify-between px-5 ";
const fontStyle = "text-lg text-[color:var(--color-black)]";
const fontStyleWhite = "text-lg text-[color:var(--color-white)]";

type HeaderTopProps = {
  fontColor?: string;
  children: React.ReactNode;
  backward?: boolean;
  icon?: string;
  clickPlusHandler?: () => void;
  clickPenHandler?: () => void;
};

const HeaderTop = ({
  fontColor = "black",
  children,
  backward = true,
  icon = "",
  clickPlusHandler,
  clickPenHandler,
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
          backward : 뒤로가기 아이콘 표시 여부 (boolean)
          icon : 아이콘 종류 (plus, pen)
          children : 헤더에 표시할 텍스트
          clickPlusHandler : plus 클릭 핸들러
          clickPenHandler : pen 아이콘 클릭 핸들러
      */}
      <div className={headerStyle}>
        <span onClick={handleBack}>
          <ChevronLeft
            color={
              fontColor === "black"
                ? "color:var(--color-black)"
                : "color:var(--color-white)"
            }
            size={16}
            className={backward ? "" : "invisible"}
          />
        </span>
        <span className={fontColor === "black" ? fontStyle : fontStyleWhite}>
          {children}
        </span>
        {icon === "plus" && (
          <span onClick={clickPlusHandler}>
            <Plus
              color={
                fontColor === "black"
                  ? "color:var(--color-black)"
                  : "color:var(--color-white)"
              }
              size={16}
            />
          </span>
        )}
        {icon === "pen" && (
          <span onClick={clickPenHandler}>
            <SquarePen
              color={
                fontColor === "black"
                  ? "color:var(--color-black)"
                  : "color:var(--color-white)"
              }
              size={16}
            />
          </span>
        )}
        {icon === "" && (
          <span onClick={clickPenHandler}>
            <SquarePen
              color={
                fontColor === "black"
                  ? "color:var(--color-black)"
                  : "color:var(--color-white)"
              }
              size={16}
              className="invisible"
            />
          </span>
        )}
      </div>
    </>
  );
};
export default HeaderTop;

import {
  ChartNoAxesColumn,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  Link2,
  Plus,
  SquarePen,
} from "lucide-react";
import Link from "next/link";
import { BiUser } from "react-icons/bi";
import { useRouter } from "next/navigation";

type GroupHeaderProps = {
  groupName: string;
  groupIntroduction: string;
  groupCount: number;
  clickToInvite: () => void;
  // 최상단 오른쪽 아이콘(pen, ellipsis)
  backward?: boolean;
  icon?: "pen" | "ellipsis" | "";
  clickPenHandler?: () => void;
  clickEllipsisHandler?: () => void;
};

const fontStyleWhite = "text-lg text-[color:var(--color-white)]";
const fontStyleIntro = "text-sm text-[color:var(--color-muted)] font-normal";
const tagStyle =
  "flex items-center justify-center gap-1 bg-[color:var(--color-white-30)] rounded-sm pl-2 pr-0.5 py-0.5 text-xs text-white cursor-pointer";

const GroupHeader = ({
  groupName,
  groupIntroduction,
  groupCount,
  clickToInvite,
  backward = true,
  icon = "",
  clickPenHandler,
  clickEllipsisHandler,
}: GroupHeaderProps) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <>
      {/* group 헤더,  그룹 정보 : 그룹명, 소개문구, 인원수*/}
      <div className="w-full flex flex-col items-center justify-center pb-5 pt-11 bg-[color:var(--color-primary-400)] gap-4">
        <div className="w-full flex justify-between items-center">
          <span onClick={handleBack} className="cursor-pointer">
            <ChevronLeft
              color={"var(--color-white)"}
              size={20}
              className={backward ? "" : "invisible"}
            />
          </span>
          {/* 그룹 이름 */}
          <span className={fontStyleWhite}>{groupName}</span>

          {icon === "pen" && (
            <span onClick={clickPenHandler} className="cursor-pointer">
              <SquarePen color={"var(--color-white)"} size={16} />
            </span>
          )}
          {icon === "ellipsis" && (
            <span onClick={clickEllipsisHandler} className="cursor-pointer">
              <Ellipsis color={"var(--color-white)"} size={16} />
            </span>
          )}
          {icon === "" && (
            <span>
              <SquarePen size={16} className="invisible" />
            </span>
          )}
        </div>
        {/*  소개문구 */}
        <p className={fontStyleIntro}>{groupIntroduction}</p>
        <div className={tagStyle}>
          <BiUser color="var(--color-white)" size={14} />

          {/* 인원수 */}
          <span className="pr-1.5">{groupCount}</span>
        </div>
        {/* 방장 권한이 있는 경우에만 보이는 부분 */}
        <div className="flex items-center justify-center gap-4">
          <Link href="/statistics">
            <div className={tagStyle}>
              <ChartNoAxesColumn size={14} strokeWidth={3} />
              <span>통계</span>
              <ChevronRight color="var(--color-white)" size={14} />
            </div>
          </Link>

          <div className={tagStyle} onClick={clickToInvite}>
            <Link2 size={12} strokeWidth={2} />
            <span>초대</span>
            <ChevronRight color="var(--color-white)" size={14} />
          </div>
        </div>
      </div>
    </>
  );
};
export default GroupHeader;

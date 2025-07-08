import { ChartNoAxesColumn, ChevronRight, Link2 } from "lucide-react";

import UserIcon from "../../assets/icon/user_icon.svg";

import HeaderTop from "../ui/HeaderTop";

const fontStyleIntro = "text-sm text-[color:var(--color-white)] font-normal";
const tagStyle =
  "flex items-center justify-center gap-1 bg-[color:var(--color-white-30)] rounded-sm pl-2 pr-0.5 py-0.5 text-xs text-white cursor-pointer";

type GroupHeaderProps = {
  children?: React.ReactNode;
  // 최상단 오른쪽 아이콘(pen, ellipsis)
  topIcon?: "pen" | "ellipsis" | "";
};

// children ❌ 그룹 정보 받아와서 사용하도록 추후 수정

const GroupHeader = ({ children, topIcon = "" }: GroupHeaderProps) => {
  return (
    <>
      {/*  그룹 정보 : 그룹명, 소개문구, 인원수  */}
      {/* group 헤더 */}
      <div className="w-full flex flex-col items-center justify-center pb-5 bg-[color:var(--color-primary-400)] gap-4">
        <HeaderTop fontColor="white" backward={true} icon={topIcon}>
          {/* 그룹명 */}
          {children}
        </HeaderTop>
        {/*  소개문구 */}
        <p className={fontStyleIntro}>던전앤 파이터 커플 놀이 하는 날</p>
        <div className={tagStyle}>
          <UserIcon className="text-[var(--color-white)]" />

          {/* 인원수 */}
          <span className="pr-1.5">2</span>
        </div>
        {/* 방장 권한이 있는 경우에만 보이는 부분 */}
        <div className="flex items-center justify-center gap-4">
          <div className={tagStyle}>
            <ChartNoAxesColumn size={14} strokeWidth={3} />
            <span>통계</span>
            <ChevronRight color="var(--color-white)" size={14} />
          </div>
          <div className={tagStyle}>
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

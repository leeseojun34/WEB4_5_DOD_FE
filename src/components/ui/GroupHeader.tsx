import { ChartNoAxesColumn, ChevronRight, Link2 } from "lucide-react";

import userIcon from "../../assets/icon/user_icon.svg";
import HeaderTop from "../ui/HeaderTop";

const fontStyleIntro = "text-medium text-[color:var(--color-white)]";
const tagStyle =
  "flex items-center justify-center gap-1 bg-[color:var(--color-white-90)] rounded-sm px-2 py-0.5 text-xs text-white cursor-pointer";

const GroupHeader = () => {
  return (
    <>
      {/* group 헤더 */}
      <div className="w-full flex flex-col items-center justify-center pb-5 bg-[color:var(--color-primary-400)] gap-4">
        <HeaderTop fontColor="white" backward={true} icon="plus">
          모임 정보 수정
        </HeaderTop>
        <p className={fontStyleIntro}>던전앤 파이터 커플 놀이 하는 날</p>
        <div className={tagStyle}>
          <img src={userIcon} alt="userIcon" />
          <span>2</span>
        </div>
        {/* 방장 권한이 있는 경우에만 보이는 부분 */}
        <div className="flex items-center justify-center gap-4">
          <div className={tagStyle}>
            <ChartNoAxesColumn size={16} />
            <span>통계</span>
            <ChevronRight color="[color:var(--color-white)]" size={16} />
          </div>
          <div className={tagStyle}>
            <Link2 size={16} />
            <span>초대</span>
            <ChevronRight color="[color:var(--color-white)]" size={16} />
          </div>
        </div>
      </div>
    </>
  );
};
export default GroupHeader;

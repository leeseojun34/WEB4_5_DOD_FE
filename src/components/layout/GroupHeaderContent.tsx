import { ChartNoAxesColumn, ChevronRight, Link2 } from "lucide-react";
import Link from "next/link";
import { BiUser } from "react-icons/bi";

interface GroupHeaderContentProps {
  groupIntroduction: string;
  groupId: string;
  groupCount: number;
  isLeader: boolean;
}

export const GroupHeaderContent = ({
  groupIntroduction,
  groupId,
  groupCount,
  isLeader,
}: GroupHeaderContentProps) => {
  const clickToInvite = () => {
    console.log("invited");
  };

  const fontStyleIntro = "text-sm text-[color:var(--color-muted)] font-normal";
  const tagStyle =
    "flex items-center justify-center gap-1 bg-[color:var(--color-white-30)] rounded-sm pl-2 pr-0.5 py-0.5 text-xs text-white cursor-pointer";
  return (
    <>
      <p className={fontStyleIntro}>{groupIntroduction}</p>
      <Link href={`/group/${groupId}/members`} className={tagStyle}>
        <BiUser color="var(--color-white)" size={14} />

        {/* 인원수 */}
        <span className="pr-1.5">{groupCount}</span>
      </Link>
      {isLeader && (
        <div className="flex items-center justify-center gap-4">
          <Link href={`/group/${groupId}/analytics`}>
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
      )}
    </>
  );
};

export default GroupHeaderContent;

import { ChartNoAxesColumn, ChevronRight, Link2 } from "lucide-react";
import Link from "next/link";
import { BiUser } from "react-icons/bi";

interface GroupHeaderContentProps {
  description: string;
  id: string;
  count: number;
  isLeader: boolean;
  type: "schedule" | "group";
}

export const GroupHeaderContent = ({
  description,
  id,
  count,
  isLeader,
  type,
}: GroupHeaderContentProps) => {
  const clickToInvite = () => {
    console.log("invited");
  };

  const fontStyleIntro = "text-sm text-[color:var(--color-muted)] font-normal";
  const tagStyle = `flex items-center justify-center gap-1 bg-[color:var(--color-white-30)] rounded-sm pl-2 pr-0.5 py-0.5 text-xs text-white ${
    type === "group" ? "cursor-pointer" : ""
  }`;
  return (
    <>
      <p className={fontStyleIntro}>{description}</p>
      {type === "group" ? (
        <Link href={`/group/${id}/members`} className={tagStyle}>
          <BiUser color="var(--color-white)" size={14} />

          {/* 인원수 */}
          <span className="pr-1.5">{count}</span>
        </Link>
      ) : (
        <div className={tagStyle}>
          <BiUser color="var(--color-white)" size={14} />

          {/* 인원수 */}
          <span className="pr-1.5">{count}</span>
        </div>
      )}
      {isLeader && type === "group" && (
        <div className="flex items-center justify-center gap-4">
          <Link href={`/group/${id}/analytics`}>
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

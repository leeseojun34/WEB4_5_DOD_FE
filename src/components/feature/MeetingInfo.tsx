import { Clock } from "lucide-react";
import groupIcon from "@/assets/icon/group_icon.svg";
import Image from "next/image";

interface MeetingInfoProps {
  members: { name: string; scheduleRole: string }[];
  time: string;
}
const MeetingInfo = ({ members, time }: MeetingInfoProps) => {
  return (
    <div className="bg-[color:var(--color-white)] px-5 py-4 gap-4 rounded-lg flex flex-col shadow-[var(--shadow-common)]">
      <div className="flex w-full items-center gap-4">
        <div>
          <Image src={groupIcon} alt="그룹 아이콘" className="w-4 h-4" />
        </div>
        <div className="w-full">
          <div className="text-[color:var(--color-primary-300)] text-xs">
            모임 인원
          </div>
          <div className="text-[color:var(--color-black)] text-sm">
            {members.map((member) => member.name).join(", ")}
          </div>
        </div>
      </div>
      <div className="flex w-full items-center gap-4">
        <div>
          <Clock className="text-[color:var(--color-black)] w-4 h-4" />
        </div>
        <div className="w-full">
          <div className="text-[color:var(--color-primary-300)] text-xs">
            모임 시간
          </div>
          <div className="text-[color:var(--color-black)] text-sm">{time}</div>
        </div>
      </div>
    </div>
  );
};
export default MeetingInfo;

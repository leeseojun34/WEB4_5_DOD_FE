import { Clock } from "lucide-react";
import { MdOutlineGroups } from "react-icons/md";

interface MeetingInfoProps {
  members: string[];
  time: string;
}
const MeetingInfo = ({ members, time }: MeetingInfoProps) => {
  return (
    <div className="bg-[color:var(--color-white)] px-5 py-4 gap-4 rounded-lg flex flex-col shadow-[var(--shadow-common)]">
      <div className="flex w-full items-center gap-4">
        <div>
          <MdOutlineGroups className="text-[color:var(--color-black)] w-4 h-4" />
        </div>
        <div className="w-full">
          <div className="text-[color:var(--color-primary-300)] text-xs">
            모임 인원
          </div>
          <div className="text-[color:var(--color-black)] text-sm">
            {members.join(", ")}
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

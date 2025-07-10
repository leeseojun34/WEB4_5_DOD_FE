'use client'

import { EllipsisVertical } from "lucide-react";
import NameTag from "./NameTag";

interface ScheduleItemProps {
  name: string;
  type: "온라인" | "오프라인";
  time: string;
  members: string[];
}
const ScheduleItem = ({ name, type, time, members }: ScheduleItemProps) => {
  return (
    <div className="min-w-[335px] max-w-185 w-full h-auto p-4 rounded-lg bg-[color:var(--color-white)] shadow-[--shadow-common] gap-2 flex flex-col">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <p className="text-[color:var(--color-gray)] text-xs font-medium">
            {name}
          </p>
          <p className="text-[color:var(--color-primary-400)] text-xs font-regular">
            {type}
          </p>
        </div>
        <button className="cursor-pointer">
          <EllipsisVertical className="w-[18px] h-[18px] text-[color:var(--color-black)]" />
        </button>
      </div>
      <div className="text-sm font-medium text-[color:var(--color-black)]">
        {time}
      </div>
      <div className="flex gap-1">
        {members.map((member, i) => (
          <NameTag name={member} key={`${member}-${i}`} />
        ))}
      </div>
    </div>
  );
};

export default ScheduleItem;

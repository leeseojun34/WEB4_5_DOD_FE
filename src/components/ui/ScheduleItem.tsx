"use client";

import { EllipsisVertical } from "lucide-react";
import NameTag from "./NameTag";
import DropdownSmall from "./DropdownSmall";
import { useState } from "react";

interface ScheduleItemProps {
  name: string;
  type: "온라인" | "오프라인";
  time: string;
  members: string[];
}
const ScheduleItem = ({ name, type, time, members }: ScheduleItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTopClick = () => {
    console.log("상단 메뉴 클릭");
  };

  const handleBottomClick = () => {
    console.log("상단 메뉴 클릭");
  };
  return (
    <div className="min-w-[335px] max-w-185 w-full h-auto p-4 rounded-lg bg-[color:var(--color-white)] shadow-[--shadow-common] gap-2 flex flex-col">
      <div className="flex justify-between relative">
        <div className="flex gap-3">
          <p className="text-[color:var(--color-gray)] text-xs font-medium">
            {name}
          </p>
          <p className="text-[color:var(--color-primary-400)] text-xs font-regular">
            {type}
          </p>
        </div>
        <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <EllipsisVertical className="w-[18px] h-[18px] text-[color:var(--color-black)]" />
        </button>
        {isOpen && (
          <div className="absolute right-0 top-6">
            <DropdownSmall
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              onTopClick={handleTopClick}
              onBottomClick={handleBottomClick}
            >
              {["수정하기", "삭제하기"]}
            </DropdownSmall>
          </div>
        )}
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

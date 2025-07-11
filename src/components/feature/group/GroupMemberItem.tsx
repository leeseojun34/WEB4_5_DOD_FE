"use client";

import DropdownSmall from "@/components/ui/DropdownSmall";
import { EllipsisVertical } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

interface GroupMemberItemProps {
  isLeader?: boolean;
  character: StaticImageData;
  name: string;
}

const GroupMemberItem = ({
  isLeader = false,
  character,
  name,
}: GroupMemberItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTopClick = () => {
    console.log("상단 메뉴 클릭");
  };

  const handleBottomClick = () => {
    console.log("상단 메뉴 클릭");
  };
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-3 items-center">
        <Image src={character} alt="유저 캐릭터" className="w-6 h-7" />
        <div className="text-sm font-medium text-[color:var(--color-black)]">
          {name}
        </div>
      </div>
      {isLeader && (
        <div className="relative">
          <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
            <EllipsisVertical className="w-[18px] h-[18px] text-[color:var(--color-gray)]" />
          </button>
          {isOpen && (
            <div className="absolute right-0 top-6">
              <DropdownSmall
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onTopClick={handleTopClick}
                onBottomClick={handleBottomClick}
              >
                {["내보내기", "방장뺏기"]}
              </DropdownSmall>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupMemberItem;

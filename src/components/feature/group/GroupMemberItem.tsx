"use client";

import DropdownSmall from "@/components/ui/DropdownSmall";
import { EllipsisVertical } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import crownIcon from "@/assets/icon/crown_icon.svg";

interface GroupMemberItemProps {
  character: StaticImageData;
  name: string;
  role: string;
  myId: string;
  memberId: string;
  isLeader: boolean;
}

const GroupMemberItem = ({
  character,
  name,
  role,
  myId,
  memberId,
  isLeader,
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
        <div className="relative">
          <Image src={character} alt="유저 캐릭터" className="w-6 h-7" />
          {role === "GROUP_LEADER" && (
            <Image
              src={crownIcon}
              alt="왕관 아이콘"
              className="absolute top-[2px] left-1/2 -translate-x-1/2 w-[9px] h-[7px]"
            />
          )}
        </div>
        <div className="text-sm font-medium text-[color:var(--color-black)]">
          {name}
        </div>
      </div>
      {isLeader && myId !== memberId && (
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

                {role === "GROUP_LEADER" ? ["내보내기", "방장취소"]: ["내보내기","방장임명"]}
              </DropdownSmall>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupMemberItem;

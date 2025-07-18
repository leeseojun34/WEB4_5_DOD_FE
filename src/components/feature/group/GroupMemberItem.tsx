"use client";

import DropdownSmall from "@/components/ui/DropdownSmall";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import crownIcon from "@/assets/icon/crown_icon.svg";
import ControlledAlertBox from "@/components/ui/ControlledAlertBox";
import { profileImages } from "@/lib/profileImages";

interface GroupMemberItemProps {
  profileNum: number;
  name: string;
  role: string;
  myId: string;
  memberId: string;
  isLeader: boolean;
}

const GroupMemberItem = ({
  profileNum,
  name,
  role,
  myId,
  memberId,
  isLeader,
}: GroupMemberItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertAction, setAlertAction] = useState<"kick" | "transfer" | "take">(
    "kick"
  );

  const profileImage = profileImages[profileNum];

  const handleTopClick = () => {
    setAlertAction(role === "GROUP_LEADER" ? "take" : "transfer");
    setIsAlertOpen(true);
  };

  const handleBottomClick = () => {
    setAlertAction("kick");
    setIsAlertOpen(true);
  };

  const getAlertContent = () => {
    switch (alertAction) {
      case "kick":
        return `${name}님을 그룹에서 내보내시겠습니까?`;
      case "transfer":
        return `${name}님에게 방장 권한을 주시겠습니까?`;
      case "take":
        return `${name}님의 방장 권한을 뺏으시겠습니까?`;
      default:
        return "정말로 실행하시겠습니까?";
    }
  };

  const handleAlertAction = () => {
    switch (alertAction) {
      case "kick":
        console.log("멤버 내보내기");
        break;
      case "transfer":
        console.log("방장 권한 주기");
        break;
      case "take":
        console.log("방장 권한 뺏기");
        break;
    }
  };
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-3 items-center">
        <div className="relative">
          <Image src={profileImage} alt="유저 캐릭터" className="w-6 h-7" />
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
                {role === "GROUP_LEADER"
                  ? ["방장뺏기", "내보내기"]
                  : ["방장주기", "내보내기"]}
              </DropdownSmall>
            </div>
          )}
          <ControlledAlertBox
            content={getAlertContent()}
            cancel="취소"
            action="확인"
            isOpen={isAlertOpen}
            onClose={() => setIsAlertOpen(false)}
            actionHandler={handleAlertAction}
          />
        </div>
      )}
    </div>
  );
};

export default GroupMemberItem;

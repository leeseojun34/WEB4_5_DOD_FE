"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import GroupHeader from "@/components/layout/GroupHeader";
import DropdownSmall from "@/components/ui/DropdownSmall";

interface GroupHeaderSectionProps {
  groupId: string;
  groupName: string;
  groupIntroduction: string;
  groupCount: number;
}

const GroupHeaderSection = ({
  groupId,
  groupName,
  groupIntroduction,
  groupCount,
}: GroupHeaderSectionProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleEllipsisClick = (): void => {
    setIsOpen(true);
  };

  const handleEditClick = (): void => {
    router.push(`/group/${groupId}/edit`);
  };

  const handleQuitClick = (): void => {
    console.log("나가기 버튼 클릭");
  };

  return (
    <>
      <div className="hidden sm:block">
        <Header type="blue" />
      </div>
      <GroupHeader
        groupName={groupName}
        groupIntroduction={groupIntroduction}
        groupCount={groupCount}
        clickToInvite={() => console.log("초대함")}
        icon="ellipsis"
        clickEllipsisHandler={handleEllipsisClick}
      />
      {isOpen && (
        <div className="absolute right-4 top-18">
          <DropdownSmall
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onTopClick={handleEditClick}
            onBottomClick={handleQuitClick}
          >
            {["그룹 정보 수정", "그룹 나가기"]}
          </DropdownSmall>
        </div>
      )}
    </>
  );
};

export default GroupHeaderSection;
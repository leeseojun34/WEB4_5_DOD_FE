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
  groupRole: string;
}

const GroupHeaderSection = ({
  groupId,
  groupName,
  groupIntroduction,
  groupCount,
  groupRole,
}: GroupHeaderSectionProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleEditClick = (): void => {
    router.push(`/group/${groupId}/edit`);
  };

  const handleQuitClick = (): void => {
    console.log("나가기 버튼 클릭");
  };

  return (
    <>
      {/* <div className="hidden sm:block">
        <Header type="blue" />
      </div> */}
      <GroupHeader
        name={groupName}
        description={groupIntroduction}
        count={groupCount}
        isLeader={groupRole === "GROUP_LEADER"}
        type="group"
        id={groupId}
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

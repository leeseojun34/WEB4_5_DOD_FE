"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import GroupHeader from "@/components/layout/GroupHeader";
import DropdownSmall from "@/components/ui/DropdownSmall";
import KakaoScript from "../../KakaoScript";
import { useKakaoShare } from "@/lib/api/useKakaoShare";

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

  const { shareWithTemplate } = useKakaoShare();
  const handleKakaoShare = () => {
    shareWithTemplate(
      "지금 바로 그룹에 들어와서 일정을 확인하고, 필요한 시간도 추가해보세요."
    );
  };

  return (
    <>
      <div className="hidden sm:block">
        <Header type="blue" />
        
      </div>
      <GroupHeader
        name={groupName}
        description={groupIntroduction}
        count={groupCount}
        isLeader={groupRole === "GROUP_LEADER"}
        type="group"
        id={groupId}
        clickToInvite={handleKakaoShare}
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
      <KakaoScript />
    </>
  );
};

export default GroupHeaderSection;

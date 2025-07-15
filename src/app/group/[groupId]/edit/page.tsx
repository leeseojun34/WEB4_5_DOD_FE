"use client";

import Header from "@/components/layout/Header";
import HeaderTop from "@/components/layout/HeaderTop";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useGroup, useUpdateGroup } from "@/lib/api/groupApi";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const EditGroup = () => {
  const params = useParams();
  const groupId = params.groupId as string;

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const updateGroupMutation = useUpdateGroup();

  const { data: groupData } = useGroup(groupId);

  useEffect(() => {
    if (groupData) {
      setGroupName(groupData.name);
      setGroupDescription(groupData.description);
    }
  }, [groupData]);

  const handleUpdateGroup = () => {
    updateGroupMutation.mutate({
      id: groupId,
      data: {
        name: groupName.trim(),
        description: groupDescription.trim(),
      },
    });
  };

  const isFormValid =
    groupName.trim().length > 0 && groupDescription.trim().length > 0;
  const isLoading = updateGroupMutation.isPending;
  const buttonState = !isFormValid || isLoading ? "disabled" : "default";

  return (
    <div className="w-full">
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="bg-[color:var(--color-white)] min-w-[375px] w-full max-w-185 mx-auto flex flex-col items-center pt-25 sm:pt-40 p-5">
        <HeaderTop>그룹 정보 수정</HeaderTop>
        <div className="flex flex-col w-full gap-8">
          <Input
            label="그룹 이름"
            placeholder="그룹 이름을 입력하세요"
            maxLength={10}
            value={groupName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setGroupName(e.target.value)
            }
            fullWidth={true}
          />
          <Input
            label="그룹 설명"
            placeholder="그룹 설명을 입력하세요"
            maxLength={50}
            value={groupDescription}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setGroupDescription(e.target.value)
            }
            fullWidth={true}
            isTextarea
          />
        </div>

        <div className="fixed w-full left-0 right-0 px-5 bottom-9">
          <div className="max-w-185 mx-auto flex flex-col items-center gap-5">
            <button className="text-[color:var(--color-red)] text-xs w-full text-center cursor-pointer">
              그룹 삭제하기
            </button>
            <Button onClick={handleUpdateGroup} state={buttonState}>
              {isLoading ? "수정 중.." : "수정 완료"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditGroup;

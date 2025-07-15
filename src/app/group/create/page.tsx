"use client";
import Header from "@/components/layout/Header";
import HeaderTop from "@/components/layout/HeaderTop";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useCreateGroup } from "@/lib/api/groupApi";
import { ChangeEvent, useState } from "react";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const createGroupMutation = useCreateGroup();

  const handleCreateGroup = () => {
    if (!groupName.trim() || !groupDescription.trim()) {
      alert("모든 정보를 입력해주세요");
      return;
    }
    createGroupMutation.mutate({
      name: groupName.trim(),
      description: groupDescription.trim(),
    });
  };

  const isFormValid =
    groupName.trim().length > 0 && groupDescription.trim().length > 0;
  const isLoading = createGroupMutation.isPending;
  const buttonState = !isFormValid || isLoading ? "disabled" : "default";

  return (
    <div className="bg-[color:var(--color-white)] min-h-screen">
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="min-w-[375px] w-full max-w-185 px-5 flex flex-col items-center gap-8 mx-auto pt-25 sm:pt-40">
        <HeaderTop />
        <div className="text-xl text-[color:var(--color-black)] text-start w-full font-semibold">
          그룹 이름과 설명을 입력해 주세요
        </div>
        <div className="flex flex-col w-full gap-4">
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
          <div className="max-w-185 mx-auto">
            <Button onClick={handleCreateGroup} state={buttonState}>
              {isLoading ? "생성 중.." : "그룹 생성"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateGroup;

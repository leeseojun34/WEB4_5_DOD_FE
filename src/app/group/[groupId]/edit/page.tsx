"use client";

import Header from "@/components/layout/Header";
import HeaderTop from "@/components/layout/HeaderTop";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  deleteGroup,
  updateGroup,
  useGroupSchedules,
} from "@/lib/api/groupApi";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  listVariants,
  itemVariants,
} from "@/components/feature/schedule/motion";
import GlobalLoading from "@/app/loading";
import { useGroupDetailPage } from "@/components/feature/group/detail/hooks/useGroupDetailLogic";
import { useQueryClient } from "@tanstack/react-query";
import ControlledAlertBox from "@/components/ui/ControlledAlertBox";
import Toast from "@/components/ui/Toast";

const EditGroup = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { groupId, userPending, isMember } = useGroupDetailPage();
  const { data: groupData, isPending: groupPending } = useGroupSchedules(
    groupId,
    isMember
  );

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    if (groupData?.data) {
      setGroupName(groupData.data.groupName || "");
      setGroupDescription(groupData.data.groupDescription || "");
    }
  }, [groupData]);

  if (userPending || groupPending || !groupData) {
    return <GlobalLoading />;
  }

  const handleUpdateGroup = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      const response = await updateGroup(groupId, {
        groupName: groupName.trim(),
        description: groupDescription.trim(),
      });
      if (response.code === "200") {
        queryClient.invalidateQueries({ queryKey: ["dashboard", "groups"] });
        queryClient.invalidateQueries({ queryKey: ["groupSchedule", groupId] });
        router.push(`/group/${response.data.groupId}`);
      }
    } catch {
      Toast("정보 수정에 실패했습니다.");
      return;
    }
  };

  const handleDeleteGroup = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteGroup(groupId);
      if (response.code === "200") {
        queryClient.invalidateQueries({ queryKey: ["dashboard", "groups"] });
        queryClient.invalidateQueries({ queryKey: ["groupSchedule", groupId] });
        router.push("/");
      }
    } catch {
      Toast("그룹 삭제에 실패했습니다.");
      return;
    }
  };

  const isFormValid =
    groupName.trim().length > 0 &&
    groupDescription.trim().length > 0 &&
    !isUpdating &&
    !isDeleting;
  const buttonState = !isFormValid ? "disabled" : "default";

  return (
    <div className="w-full">
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="bg-[color:var(--color-white)] min-w-[375px] w-full max-w-185 mx-auto flex flex-col items-center pt-25 sm:pt-40 p-5">
        <HeaderTop>그룹 정보 수정</HeaderTop>
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col w-full gap-8"
        >
          <motion.div variants={itemVariants}>
            <Input
              label="그룹 이름"
              placeholder="그룹 이름을 입력하세요"
              maxLength={20}
              value={groupName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setGroupName(e.target.value)
              }
              fullWidth={true}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
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
          </motion.div>
        </motion.div>

        <div className="fixed w-full left-0 right-0 px-5 bottom-9">
          <div className="max-w-185 mx-auto flex flex-col items-center gap-5">
            <button
              className="hover:text-[color:var(--color-red)] text-[color:var(--color-gray-placeholder)] text-xs w-full text-center cursor-pointer"
              onClick={() => setIsAlertOpen(true)}
            >
              그룹 삭제하기
            </button>
            <Button onClick={handleUpdateGroup} state={buttonState}>
              {isUpdating ? "수정 중.." : "수정 완료"}
            </Button>
          </div>
        </div>
      </div>
      <ControlledAlertBox
        content={"정말 삭제하시겠습니까?"}
        cancel="취소"
        action="확인"
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        actionHandler={() => handleDeleteGroup()}
      />
    </div>
  );
};
export default EditGroup;

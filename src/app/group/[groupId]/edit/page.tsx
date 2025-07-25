"use client";

import Header from "@/components/layout/Header";
import HeaderTop from "@/components/layout/HeaderTop";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { deleteGroup, getGroup, updateGroup } from "@/lib/api/groupApi";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  listVariants,
  itemVariants,
} from "@/components/feature/schedule/motion";

const EditGroup = () => {
  const router = useRouter();
  const params = useParams();
  const groupId = params.groupId as string;

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await getGroup(groupId);
        if (res.data) {
          setGroupName(res.data.groupName);
          setGroupDescription(res.data.groupDescription);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchGroup();
  }, [groupId]);

  const handleUpdateGroup = async () => {
    try {
      const response = await updateGroup(groupId, {
        groupName: groupName.trim(),
        description: groupDescription.trim(),
      });
      if (response.code === "200") {
        router.push(`/group/${response.data.groupId}`);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      const response = await deleteGroup(groupId);
      if (response.code === "200") {
        router.push("/");
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const isFormValid =
    groupName.trim().length > 0 && groupDescription.trim().length > 0;
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
              maxLength={15}
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
              className="text-[color:var(--color-red)] text-xs w-full text-center cursor-pointer"
              onClick={handleDeleteGroup}
            >
              그룹 삭제하기
            </button>
            <Button onClick={handleUpdateGroup} state={buttonState}>
              수정 완료
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditGroup;

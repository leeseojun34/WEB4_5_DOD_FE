"use client";
import Header from "@/components/layout/Header";
import HeaderTop from "@/components/layout/HeaderTop";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useCreateGroup } from "@/lib/api/groupApi";
import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  listVariants,
  itemVariants,
} from "@/components/feature/schedule/motion";
import useAuthRequired from "../schedule/hooks/useAuthRequired";
import GlobalLoading from "@/app/loading";

const CreateGroupPage = () => {
  const { isAuthenticated, isLoading } = useAuthRequired();
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");

  const createGroupMutation = useCreateGroup();

  const handleCreateGroup = () => {
    createGroupMutation.mutate({
      groupName: groupName.trim(),
      description: description.trim(),
    });
  };

  const isFormValid =
    groupName.trim().length > 0 &&
    description.trim().length > 0 &&
    !createGroupMutation.isPending;
  const buttonState = !isFormValid ? "disabled" : "default";

  if (isLoading || !isAuthenticated) {
    return <GlobalLoading />;
  }

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
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col w-full gap-4"
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
              value={description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
              fullWidth={true}
              isTextarea
            />
          </motion.div>
        </motion.div>
        <div className="fixed w-full left-0 right-0 px-5 bottom-9">
          <div className="max-w-185 mx-auto">
            <Button onClick={handleCreateGroup} state={buttonState}>
              {createGroupMutation.isPending ? "생성 중.." : "그룹 생성"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateGroupPage;

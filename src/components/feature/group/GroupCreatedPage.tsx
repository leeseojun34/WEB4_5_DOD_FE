"use client";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import {
  listVariants,
  itemVariants,
} from "@/components/feature/schedule/motion";
import { Bubble } from "@/components/ui/Bubble";
import Image from "next/image";
import group_created from "@/assets/images/group_created_rabbits.png";
import { useParams, useRouter } from "next/navigation";

const GroupCreatedPage = () => {
  const params = useParams();
  const groupId = params.groupId;
  const router = useRouter();

  return (
    <>
      <div className="relative bg-[var(--color-primary-100)]">
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center items-center h-screen"
        >
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className=""
          >
            <Bubble>
              <div className="text-base">
                그룹이 성공적으로
                <br /> 생성되었습니다 🎉
              </div>
            </Bubble>
          </motion.div>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className=""
          >
            <Image
              src={group_created}
              alt="complete_image"
              width={312}
              height={312}
              className=""
            />
          </motion.div>
        </motion.div>
        <div className="fixed w-full left-0 right-0 px-5 bottom-9">
          <div className="max-w-185 mx-auto">
            <Button onClick={() => router.replace(`/group/${groupId}`)}>
              그룹 페이지로 이동
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupCreatedPage;

"use client";

import { OptionBox } from "@/components/ui/OptionBox";
import Image from "next/image";
import newScheduleImg from "@/assets/images/rabbit_new_schedule.png";
import prevScheduleImg from "@/assets/images/rabbit_prev_schedule.png";
import Tip from "@/components/ui/Tip";
import { Button } from "@/components/ui/Button";
import HeaderTop from "@/components/layout/HeaderTop";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import { motion } from "framer-motion";
import {
  itemVariants,
  listVariants,
} from "@/components/feature/schedule/motion";

const GroupScheduleCreateSelectPage = () => {
  const [selected, setSelected] = useState("create");
  const params = useParams();
  const groupId = params?.groupId;
  const router = useRouter();
  const userId = "GOOGLE_116827515645165286764";

  const handleNavigate = () => {
    if (selected === "create") {
      router.push(`/schedule/create?groupId=${groupId}`);
    } else {
      router.push(`/schedule/user/${userId}?groupId=${groupId}`);
    }
  };

  return (
    <section>
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="w-full">
        <div className="min-w-[375px] w-full max-w-185 px-5 flex flex-col items-center gap-9 mx-auto pt-25 sm:pt-40">
          <HeaderTop />
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col w-full gap-8"
          >
            <p className="w-full text-xl font-bold text-[color:var(--color-black)] text-start">
              일정 추가 방법을 선택해주세요
            </p>
            <motion.div className="w-full flex gap-5" variants={itemVariants}>
              <div className="w-full" onClick={() => setSelected("create")}>
                <OptionBox isSelected={selected === "create"}>
                  <Image
                    height={52}
                    width={52}
                    src={newScheduleImg}
                    alt="새로운 일정 추가 이미지"
                  />
                  <p className="font-medium text-[color:var(--color-black)] text-center">
                    새로운 일정 <br />
                    생성
                  </p>
                </OptionBox>
              </div>
              <div className="w-full" onClick={() => setSelected("load")}>
                <OptionBox isSelected={selected === "load"}>
                  <Image
                    height={52}
                    width={52}
                    src={prevScheduleImg}
                    alt="기존 일정 추가 이미지"
                  />
                  <p className="font-medium text-[color:var(--color-black)] text-center">
                    내 일정 <br />
                    불러오기
                  </p>
                </OptionBox>
              </div>
            </motion.div>
            <motion.div className="w-full" variants={itemVariants}>
              {selected === "create" ? (
                <motion.div
                  key="create"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Tip>새로운 만남, 여기서부터 시작해요! 🗓️</Tip>
                </motion.div>
              ) : (
                <motion.div
                  key="load"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Tip>전에 만든 일정이 있다면 불러와서 바로 써보세요! 🙌</Tip>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          <div className="fixed w-full left-0 right-0 px-5 bottom-9">
            <div className="max-w-185 mx-auto">
              <div className="w-full flex justify-center">
                <Button onClick={handleNavigate}>그룹 일정으로 불러오기</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default GroupScheduleCreateSelectPage;

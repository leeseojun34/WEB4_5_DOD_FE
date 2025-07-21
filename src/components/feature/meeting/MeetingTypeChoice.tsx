"use client";
import Tip from "@/components/ui/Tip";
import MeetingTypeOptions from "./MeetingTypeOptions";
import { Button } from "@/components/ui/Button";
import HeaderTop from "@/components/layout/HeaderTop";
import Header from "@/components/layout/Header";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  itemVariants,
  listVariants,
} from "@/components/feature/schedule/motion";

const MeetingTypeChoice = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<"once" | "recurring">(
    "once"
  );

  const handleNext = () => {
    if (selectedType === "once") {
      router.push("/schedule/create");
    } else {
      router.push("/group/create");
    }
  };
  return (
    <>
      <section>
        <div className="hidden sm:block">
          <Header />
        </div>
        <HeaderTop />
        <div className="flex flex-col  max-h-screen relative max-w-[740px] mx-auto px-5">
          <main className="flex flex-col gap-8 relative pt-25 sm:pt-40 min-h-screen box-border">
            <h1 className="text-xl font-bold">모임 유형을 선택해주세요</h1>
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div className="w-full" variants={itemVariants}>
                <MeetingTypeOptions
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                />
              </motion.div>
              <motion.div className="w-full" variants={itemVariants}>
                {selectedType === "once" ? (
                  <motion.div
                    key="once"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <Tip>
                      한 번 모임은 정해진 날 딱 한 번 만나는 일정이에요! 🎉
                      <br />
                      친구들과 번개 모임이나 영화 보기, 특별한 날에 좋아요 🌳
                    </Tip>
                  </motion.div>
                ) : (
                  <motion.div
                    key="recurring"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <Tip>
                      자주 모임은 그룹을 만들어 여러 번 만날 수 있어요! 🔁
                      <br />
                      독서모임, 스터디, 운동모임처럼 꾸준한 만남에 딱이에요 📚🏃‍♀️
                    </Tip>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
            <div className="w-full flex items-center justify-center absolute bottom-9 left-0">
              <Button state="default" onClick={handleNext}>
                다음
              </Button>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};
export default MeetingTypeChoice;

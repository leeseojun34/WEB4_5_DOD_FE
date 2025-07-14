"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Tip from "@/components/ui/Tip";
import { OptionBox } from "@/components/ui/OptionBox";
import Image from "next/image";
import schedule_notebook from "@/assets/images/schedule_notebook.png";
import schedule_backpack from "@/assets/images/schedule_backpack.png";
import { motion } from "framer-motion";
import { listVariants, itemVariants } from "./motion";

// TODO: 추후 리펙토링 필요할듯

const ScheduleModeList = () => {
  const [mode, setMode] = useState<"online" | "offline" | null>(null);

  const handleModeChange = (mode: "online" | "offline") => {
    setMode(mode);
  };

  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-3"
    >
      <div className="mx-5">
        <div className="flex flex-col gap-8">
          <motion.div
            className="flex items-center gap-2 mx-auto "
            variants={itemVariants}
          >
            <div className="w-13">
              <Input
                type="number"
                value={10}
                placeholder="0"
                onChange={() => {}}
              />
            </div>

            <span> 명</span>
          </motion.div>
          <motion.div variants={itemVariants}>
            <div className="flex gap-5">
              <OptionBox isSelected={mode === "online"}>
                <div
                  className="flex flex-col gap-3 items-center"
                  onClick={() => handleModeChange("online")}
                >
                  <Image src={schedule_notebook} alt="온라인" width={52} />
                  온라인
                </div>
              </OptionBox>
              <OptionBox isSelected={mode === "offline"}>
                <div
                  className="flex flex-col gap-3 items-center"
                  onClick={() => handleModeChange("offline")}
                >
                  <Image src={schedule_backpack} alt="오프라인" width={52} />
                  오프라인
                </div>
              </OptionBox>
            </div>
          </motion.div>
        </div>
        <motion.div className="mt-8" variants={itemVariants}>
          <Tip>
            온라인은 온라인 회의장(줌, 디스코드 등)을 등록할 수 있어요. <br />
            오프라인은 직접 만날 장소(식당, 카페, 지하철역 등)를 등록할 수
            있어요.
          </Tip>
        </motion.div>
      </div>
    </motion.div>
  );
};
export default ScheduleModeList;

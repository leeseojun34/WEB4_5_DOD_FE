"use client";

import { Bubble } from "@/components/ui/Bubble";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import complete_image from "@/assets/images/schedule_rabbits.png";
import {
  listVariants,
  itemVariants,
} from "@/components/feature/schedule/motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useEventDetail } from "@/lib/api/scheduleApi";
import GlobalLoading from "@/app/loading";
import Toast from "@/components/ui/Toast";

const Complete = () => {
  const { eventId } = useParams();
  const [eventInfo, setEventInfo] = useState<EventInfoType | null>(null);
  const router = useRouter();

  const { data: eventDetail } = useEventDetail(Number(eventId));

  useEffect(() => {
    if (eventDetail) {
      setEventInfo(eventDetail);
    } else {
      Toast("모임 생성에 실패했거나 허가되지 않은 접근입니다.");
      router.push("/");
    }
  }, [eventDetail, router]);

  if (!eventInfo) {
    return <GlobalLoading />;
  }

  return (
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
              {eventInfo?.title || "대나무 행주"} 모임이 <br /> 생성되었습니다
              🎉
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
            src={complete_image}
            alt="complete_image"
            width={312}
            height={312}
            className=""
          />
        </motion.div>
      </motion.div>
      <div className="absolute bottom-9 w-full px-5 flex items-center gap-3 flex-col">
        <div className="text-center text-[var(--color-gray-placeholder)] text-base mb-6 ">
          모임 친구들과 시간 맞추러 가기
        </div>
        <Link
          href={`/meeting/${eventInfo.eventId}/coordinate`}
          className="w-full text-center"
        >
          <Button state="default">이동</Button>
        </Link>
      </div>
    </div>
  );
};
export default Complete;

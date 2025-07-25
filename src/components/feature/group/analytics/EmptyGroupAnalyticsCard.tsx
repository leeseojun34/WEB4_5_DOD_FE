import Image from "next/image";
import pastelOrangeImg from "@/assets/images/profile_pastel_orange.png";
import pastelPurpleImg from "@/assets/images/profile_pastel_purple.png";
import pastelGreenImg from "@/assets/images/profile_pastel_green.png";
import { motion } from "framer-motion";
import {
  itemVariants,
  listVariants,
} from "@/components/feature/schedule/motion";

const EmptyGroupAnalyticsCard = () => {
  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="w-full flex flex-col gap-5"
    >
      <motion.div variants={itemVariants} className="flex gap-4 items-center">
        <Image
          src={pastelOrangeImg}
          alt="오렌지 토끼 캐릭터 이미지"
          width={24}
          height={26}
        />
        <span className="text-[color:var(--color-gray)]">
          멤버별 참여율을 볼 수 있어요
        </span>
      </motion.div>
      <motion.div variants={itemVariants} className="flex gap-4 items-center">
        <Image
          src={pastelPurpleImg}
          alt="보라색 토끼 캐릭터 이미지"
          width={24}
          height={26}
        />
        <span className="text-[color:var(--color-gray)]">
          요일별 모임 빈도수를 알려드려요
        </span>
      </motion.div>
      <motion.div variants={itemVariants} className="flex gap-4 items-center">
        <Image
          src={pastelGreenImg}
          alt="초록색 토끼 캐릭터 이미지"
          width={24}
          height={26}
        />
        <span className="text-[color:var(--color-gray)]">
          어디서 주로 만나는지 확인해요
        </span>
      </motion.div>
    </motion.div>
  );
};

export default EmptyGroupAnalyticsCard;

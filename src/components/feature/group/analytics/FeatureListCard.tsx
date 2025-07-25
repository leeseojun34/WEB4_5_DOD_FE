import { profileImages } from "@/lib/profileImages";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  itemVariants,
  listVariants,
} from "@/components/feature/schedule/motion";

interface FeatureItem {
  text: string;
}

interface FeatureListCardProps {
  features: FeatureItem[];
}

const FeatureListCard = ({ features }: FeatureListCardProps) => {
  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="w-full flex flex-col gap-5"
    >
      {features.map((feature, index) => (
        <motion.div
          variants={itemVariants}
          key={index}
          className="flex gap-4 items-center"
        >
          <Image
            src={profileImages[index + 1]}
            alt={`rabbit${index}`}
            width={24}
            height={26}
          />
          <span className="text-[color:var(--color-gray)]">{feature.text}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeatureListCard;

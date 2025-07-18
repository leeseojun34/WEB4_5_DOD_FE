import Image from "next/image";
import EmptyGroupAnalyticsCard from "./EmptyGroupAnalyticsCard";
import sadRabbitImg from "@/assets/images/banner_crying.png";

const EmptyGroupAnalytics = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8 mt-40">
      <Image
        src={sadRabbitImg}
        alt="데이터가 없어 슬픈 토끼 이미지"
        priority
        width={222}
        height={183}
      />
      <EmptyGroupAnalyticsCard />
    </div>
  );
};

export default EmptyGroupAnalytics;

import Image from "next/image";
import EmptyGroupAnalyticsCard from "./EmptyGroupAnalyticsCard";
import sadRabbitImg from "@/assets/images/rabbit_noschedule_sad.png";
import { Button } from "@/components/ui/Button";

const EmptyGroupAnalytics = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-20 mt-40">
      <div className="w-full h-full flex flex-col justify-center items-center gap-8">
        <Image
          src={sadRabbitImg}
          alt="데이터가 없어 슬픈 토끼 이미지"
          priority
          width={222}
          height={183}
          unoptimized
          className="w-55 h-55 sm:w-90 sm:h-90"
        />
        <EmptyGroupAnalyticsCard />
      </div>
      <Button>일정 만들러 가기</Button>
    </div>
  );
};

export default EmptyGroupAnalytics;

import Image from "next/image";
import sadRabbitImg from "@/assets/images/rabbit_noschedule_sad.png";
import { Button } from "@/components/ui/Button";
import EmptyGroupAnalyticsCard from "./EmptyGroupAnalyticsCard";
import Link from "next/link";
import { ParamValue } from "next/dist/server/request/params";

const EmptyGroupAnalytics = ({ groupId }: { groupId: ParamValue }) => {
  return (
    <div className="w-full flex flex-col items-center gap-10 sm:gap-15 relative min-h-[calc(100vh-100px)] sm:min-h-[calc(100vh-160px)] ">
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <span className="w-full text-start font-semibold text-[color:var(--color-black)] text-xl ">
          통계를 보려면 한 번 이상의
          <br /> 모임이 필요해요!
        </span>
        <Image
          src={sadRabbitImg}
          alt="데이터가 없어 슬픈 토끼 이미지"
          priority
          width={222}
          height={183}
          unoptimized
          className="w-55 h-55 sm:w-90 sm:h-90"
        />
      </div>
      <EmptyGroupAnalyticsCard />
      <Link
        href={`/group/${groupId}/schedule/create/select`}
        className="absolute w-full bottom-9"
      >
        <Button>일정 만들러 가기</Button>
      </Link>
    </div>
  );
};

export default EmptyGroupAnalytics;

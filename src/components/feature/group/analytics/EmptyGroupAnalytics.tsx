import Image from "next/image";
import sadRabbitImg from "@/assets/images/rabbit_noschedule_sad.png";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ParamValue } from "next/dist/server/request/params";
import FeatureListCard from "./FeatureListCard";

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
          width={200}
          height={160}
          unoptimized
          className="w-50 h-50 sm:w-70 sm:h-70"
        />
      </div>
      <FeatureListCard
        features={[
          { text: "멤버별 참여율을 볼 수 있어요" },
          { text: "요일별 모임 빈도수를 알려드려요" },
          { text: "어디서 주로 만나는지 확인해요" },
        ]}
      />
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

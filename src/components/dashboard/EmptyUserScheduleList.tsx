import Image from "next/image";
import sadRabbitImg from "@/assets/images/pupple_rabbit_noschedule_sad.png";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import FeatureListCard from "../feature/group/analytics/FeatureListCard";

const EmptyUserScheduleList = () => {
  return (
    <div className="w-full flex flex-col items-center gap-10 sm:gap-15 relative min-h-[calc(100vh-100px)] sm:min-h-[calc(100vh-160px)] ">
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <span className="w-full text-start font-semibold text-[color:var(--color-black)] text-xl ">
          내 이때어때 일정이
          <br /> 아직 없어요!
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
      <FeatureListCard
        features={[
          { text: "나만의 일정, 이때어때에서 만들어보세요" },
          { text: "정기적으로 약속 잡을 땐 그룹을 활용해보세요" },
          { text: "내가 만든 약속들을 한눈에 확인할 수 있어요" },
        ]}
      />
      <Link href={`/meeting`} className="absolute w-full bottom-9">
        <Button>일정 만들러 가기</Button>
      </Link>
    </div>
  );
};

export default EmptyUserScheduleList;

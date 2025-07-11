import rabbitWriting from "@/assets/images/rabbit_writing.png";
import ScheduleCard from "@/components/ui/ScheduleCard";
import HeaderTop from "@/components/layout/HeaderTop";
import Image from "next/image";

const UserSchedule = () => {
  return (
    <>
      <div className="min-w-[375px] w-full max-w-185 bg-[color:var(--color-gray-background)] mx-auto">
        <HeaderTop>나의 이때어때 일정</HeaderTop>
      </div>
      <div className="min-w-[375px] w-full max-w-185 min-h-screen bg-[color:var(--color-gray-background)] px-5 mx-auto pt-20">
        <Image
          src={rabbitWriting}
          alt="글쓰는 토끼 이미지"
          className="w-[178px] h-[178px] ml-auto"
        />
        <div className="flex flex-col items-center gap-4">
          <ScheduleCard
            variant="event"
            title="카츠오모이 가는 날"
            meetingType="온라인"
            time="7월 4일 (금) 18:00 - 22:00"
            members={["박은서", "현혜주", "황수지", "박준규", "박상윤"]}
          />
          <ScheduleCard
            variant="event"
            title="카츠오모이 가는 날"
            meetingType="온라인"
            time="7월 4일 (금) 18:00 - 22:00"
            members={["박은서", "현혜주"]}
          />
        </div>
      </div>
    </>
  );
};
export default UserSchedule;

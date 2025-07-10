import rabbitWriting from "@/assets/images/rabbit_writing.png";
import ScheduleItem from "@/components/ui/ScheduleItem";
import Image from "next/image";

const UserSchedule = () => {
  return (
    <div className="min-w-[375px] w-full max-w-185 min-h-screen bg-[color:var(--color-gray-background)] px-5 pt-[133px] mx-auto">
      <Image
        src={rabbitWriting}
        alt="글쓰는 토끼 이미지"
        className="w-[178px] h-[178px] ml-auto"
      />
      <div className="flex flex-col items-center gap-4">
        <ScheduleItem
          name="카츠오모이가는날"
          type="온라인"
          time="7월 4일 (금) 18:00 - 22:00"
          members={["박준규", "박은서", "현혜주", "박상윤", "황수지"]}
        />
        <ScheduleItem
          name="박준규 팬미팅"
          type="오프라인"
          time="7월 5일 (토) 12:00 - 22:00"
          members={["박준규", "박은서", "현혜주", "박상윤", "황수지"]}
        />
      </div>
    </div>
  );
};
export default UserSchedule;

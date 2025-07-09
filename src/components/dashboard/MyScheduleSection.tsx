import { ArrowRight } from "lucide-react";
import { MyScheduleItem } from "./MyScheduleItem";

export const MyScheduleSection = () => {
  return (
    <>
      <div className="bg-[color:var(--color-white)] p-5 rounded-xl w-full gap-2 flex flex-col">
        <div className="flex justify-between">
          <p className="font-semibold text-base text-[color:var(--color-black)]">
            나의 일정
          </p>
          <button className="font-medium text-xs text-[color:var(--color-gray-placeholder)]">
            일정 모두 보기
          </button>
        </div>
        <MyScheduleItem />
        <MyScheduleItem />

        {/* <EmptySchedule /> */}
      </div>
    </>
  );
};

const EmptySchedule = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 py-4">
      <div className="text-center text-sm text-[color:var(--color-gray-placeholder)] leading-6">
        오늘은 일정이 없어요 <br /> 새로운 일정을 만들어 볼까요?
      </div>
      <button className="flex text-[color:var(--color-primary-400)] gap-[2px] justify-center items-center">
        <span className="font-medium text-xs">일정 만들러 가기</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

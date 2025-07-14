import ScheduleSection from "./ScheduleSection";
import ActionButtons from "./ActionButtons";
import Tip from "@/components/ui/Tip";
import TitleWithShare from "./TitleWithShare";

const CoordinateContent = () => {
  return (
    <div className="pt-6 px-5 pb-9 flex flex-col w-full items-center gap-7 sm:gap-8 sm:pt-10">
      <div className="w-full">
        <TitleWithShare />
      </div>
      <div className="flex justify-center sm:justify-between w-full sm:gap-5">
        {/* 내 가능한 시간대 */}
        <ScheduleSection
          title={
            <>
              <span className="text-[color:var(--color-primary-400)]">나</span>
              의 가능한 시간대
            </>
          }
          showLoadButton={true}
        />
        {/* 함께 가능한 시간대 웹 */}
        <ScheduleSection
          title={
            <>
              <span className="text-[color:var(--color-primary-400)]">
                함께
              </span>{" "}
              가능한 시간대
            </>
          }
          className="hidden sm:flex"
        />
      </div>
      <Tip>
        가능한 시간을 선택하면, 구성원들과 겹치는 시간대를 자동으로
        확인해드려요.
      </Tip>
      {/* 함께 가능한 시간대 - 모바일*/}
      <ScheduleSection
        title={
          <>
            <span className="text-[color:var(--color-primary-400)]">함께</span>{" "}
            가능한 시간대
          </>
        }
        className="block sm:hidden"
      />
      <ActionButtons className="sm:mt-2" />
    </div>
  );
};

export default CoordinateContent;

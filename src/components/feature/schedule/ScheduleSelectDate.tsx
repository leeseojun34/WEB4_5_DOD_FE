import ScheduleTitleText from "@/components/ui/ScheduleTitle";

const ScheduleSelectDate = () => {
  return (
    <>
      <div className="flex flex-col gap-4 mt-10">
        <ScheduleTitleText
          title="모일 날짜와 시간을 선택해 주세요"
          description="날짜는 최대 7일까지 선택 가능해요!"
        />
      </div>
    </>
  );
};
export default ScheduleSelectDate;

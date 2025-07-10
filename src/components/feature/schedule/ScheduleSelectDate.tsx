import ScheduleTitleText from "@/components/ui/ScheduleTitle";
import Dropdown from "@/components/ui/Dropdown";
import { Calendar } from "@/components/feature/calendar/Calender";
const timeOptions: string[] = [];

for (let hour = 0; hour <= 24; hour++) {
  for (const minute of [0, 30]) {
    if (hour === 24 && minute > 0) continue;

    const hh = String(hour).padStart(2, "0");
    const mm = String(minute).padStart(2, "0");

    timeOptions.push(`${hh}:${mm}`);
  }
}

const ScheduleSelectDate = () => {
  return (
    <div className="flex flex-col flex-1 gap-8">
      <div className="flex flex-col gap-4 mt-10">
        <ScheduleTitleText
          title="모일 날짜와 시간을 선택해 주세요"
          description="날짜는 최대 7일까지 선택 가능해요!"
        />
      </div>
      <div className="mx-5 flex flex-col gap-8 md:w-1/2 md:mx-auto">
        <div className="flex items-center gap-4 justify-around mx-7">
          <Dropdown label="" options={timeOptions} />
          <span className="">-</span>
          <Dropdown label="" options={timeOptions} />
        </div>
        <div className="w-full border-1 border-[var(--color-gray-100)] rounded-lg">
          <div className="w-full h-full p-4 flex justify-center items-center">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ScheduleSelectDate;

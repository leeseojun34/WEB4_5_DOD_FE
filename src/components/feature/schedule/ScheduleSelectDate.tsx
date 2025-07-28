import ScheduleTitleText from "@/components/ui/ScheduleTitle";
import Dropdown from "@/components/ui/Dropdown";
import { Calendar } from "@/components/feature/calendar/Calender";
import { listVariants, itemVariants } from "./motion";
import { motion } from "framer-motion";
import Toast from "@/components/ui/Toast";

const timeOptions: string[] = [];

for (let hour = 0; hour <= 24; hour++) {
  const hh = String(hour).padStart(2, "0");
  timeOptions.push(`${hh}:00`);
}

const ScheduleSelectDate = ({
  dateList,
  setDateList,
  setStartTime,
  setEndTime,
}: {
  dateList: Date[];
  setDateList: (dateList: Date[]) => void;
  setStartTime: (startTime: string) => void;
  setEndTime: (endTime: string) => void;
}) => {
  return (
    <div className="flex flex-col flex-1 gap-8">
      <div className="flex flex-col gap-4 mt-10">
        <ScheduleTitleText
          title="모일 날짜와 시간을 선택해 주세요"
          description="날짜는 오늘 이후 최대 7일까지 선택 가능해요!"
        />
      </div>
      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="mx-5 flex flex-col gap-8 md:w-1/2 md:mx-auto"
      >
        <motion.div
          className="flex items-center gap-4 justify-around mx-7"
          variants={itemVariants}
        >
          <Dropdown
            options={timeOptions}
            defaultIndex={9}
            onSelect={(selected) => setStartTime(selected)}
          />
          <span className="">-</span>
          <Dropdown
            options={timeOptions}
            defaultIndex={18}
            onSelect={(selected) => setEndTime(selected)}
          />
        </motion.div>
        <motion.div className="w-full" variants={itemVariants}>
          <div className="w-full h-full p-4 flex justify-center items-center">
            <Calendar
              selectionMode="multiple"
              isCompact={false}
              selected={dateList}
              setSelected={(dates) => {
                if (dates!.length > 7) {
                  Toast("최대 7일까지 선택 가능해요!");
                  return;
                }
                if (dates!.length !== 0) {
                  const today = new Date();
                  const selectedDates = dates as Date[];
                  const isFuture = selectedDates.some(
                    (date) => date.getTime() >= today.getTime()
                  );

                  if (!isFuture) {
                    Toast("오늘 이후 날짜를 선택해 주세요!");
                    return;
                  }
                }

                setDateList(dates as Date[]);
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default ScheduleSelectDate;

import ScheduleTitleText from "@/components/ui/ScheduleTitle";
import Dropdown from "@/components/ui/Dropdown";
import { Calendar } from "@/components/feature/calendar/Calender";
import { listVariants, itemVariants } from "./motion";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const timeOptions: string[] = [];

for (let hour = 0; hour <= 24; hour++) {
  for (const minute of [0, 30]) {
    if (hour === 24 && minute > 0) continue;

    const hh = String(hour).padStart(2, "0");
    const mm = String(minute).padStart(2, "0");

    timeOptions.push(`${hh}:${mm}`);
  }
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
          description="날짜는 최대 7일까지 선택 가능해요!"
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
            defaultIndex={18}
            onSelect={(selected) => setStartTime(selected)}
          />
          <span className="">-</span>
          <Dropdown
            options={timeOptions}
            defaultIndex={36}
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
                  toast("최대 7일까지 선택 가능해요!", {
                    icon: "😥",
                    style: {
                      borderRadius: "50px",
                      background: "#fff",
                      border: "1px solid var(--color-red)",
                      color: "#000",
                    },
                  });
                  return;
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

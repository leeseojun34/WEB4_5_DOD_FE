import Input from "@/components/ui/Input";
import ScheduleTitleText from "@/components/ui/ScheduleTitle";
import { listVariants, itemVariants } from "./motion";
import { motion } from "framer-motion";

const ScheduleInfo = ({
  schedule,
  setSchedule,
}: {
  schedule: EventType;
  setSchedule: (schedule: EventType) => void;
}) => {
  return (
    <>
      <div className="flex flex-col gap-4 mt-10">
        <ScheduleTitleText title="일정 이름과 설명을 입력해 주세요" />
      </div>
      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="mt-8 mx-5"
      >
        <motion.div variants={itemVariants}>
          <Input
            label="일정 이름"
            placeholder="일정 이름을 입력해 주세요"
            fullWidth
            value={schedule.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSchedule({ ...schedule, title: e.target.value })
            }
          />
        </motion.div>
        <motion.div className="mt-4" variants={itemVariants}>
          <Input
            label="일정 설명"
            placeholder="일정 설명을 입력해 주세요"
            fullWidth
            isTextarea
            value={schedule.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setSchedule({ ...schedule, description: e.target.value })
            }
          />
        </motion.div>
      </motion.div>
    </>
  );
};
export default ScheduleInfo;

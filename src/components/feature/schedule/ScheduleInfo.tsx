import Input from "@/components/ui/Input";
import ScheduleTitleText from "@/components/ui/ScheduleTitle";
import ScheduleRabbit from "@/components/ui/ScheduleRabbit";

const ScheduleInfo = ({ level }: { level: number }) => {
  return (
    <>
      <ScheduleRabbit level={level} />
      <div className="flex flex-col gap-4 mt-10">
        <ScheduleTitleText title="일정 이름과 설명을 입력해 주세요" />
      </div>
      <div className="mt-8 mx-5">
        <div>
          <Input
            label="일정 이름"
            placeholder="일정 이름을 입력해 주세요"
            fullWidth
            value=""
            onChange={() => {}}
          />
        </div>
        <div className="mt-4">
          <Input
            label="일정 설명"
            placeholder="일정 설명을 입력해 주세요"
            fullWidth
            isTextarea
            value=""
            onChange={() => {}}
          />
        </div>
      </div>
    </>
  );
};
export default ScheduleInfo;

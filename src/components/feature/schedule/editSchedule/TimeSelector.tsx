import { Calendar } from "@/components/feature/calendar/Calender";
import { Button } from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import { Dispatch, SetStateAction } from "react";

interface TimeSelectorProps {
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>
  onComplete: () => void;
}

const TimeSelector = ({
  selectedDate,
  setSelectedDate,
  onComplete,
}: TimeSelectorProps) => {
  return (
    <div className="flex flex-col w-full gap-4 items-center">
      <div className="flex justify-center items-center gap-4">
        <div className="w-30">
          <Dropdown
            options={["09:00", "10:00", "11:00", "12:00", "13:00"]}
            defaultIndex={0}
          />
        </div>
        <div>-</div>
        <div className="w-30">
          <Dropdown
            options={[
              "19:00",
              "20:00",
              "21:00",
              "22:00",
              "23:00",
              "24:00",
            ]}
            defaultIndex={5}
          />
        </div>
      </div>
      <Calendar
        isCompact={false}
        selectionMode="single"
        selected={selectedDate}
        setSelected={setSelectedDate}
      />
      <Button onClick={onComplete}>수정 완료</Button>
    </div>
  );
};

export default TimeSelector;
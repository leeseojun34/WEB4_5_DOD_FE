"use client";
import { useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { ko } from "date-fns/locale";

export const Calendar = () => {
  const [selected, setSelected] = useState<Date>();
  const defaultClassNames = getDefaultClassNames();

  console.log(defaultClassNames);
  return (
    <DayPicker
      locale={ko}
      mode="single"
      selected={selected}
      onSelect={setSelected}
      navLayout="around"
      showOutsideDays={true}
      formatters={{
        formatCaption: (month) =>
          `${month.getFullYear()}년 ${month.getMonth() + 1}월`,
      }}
      classNames={{
        day_selected: "bg-blue-500 text-black rounded-sm",
        day_today: "border border-blue-500",
        day: "w-6 h-6 flex items-center justify-center text-sm",
        head_cell: "w-6 h-6 flex items-center justify-center text-sm",
      }}

      //   footer={
      //     selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
      //   }
    />
  );
};

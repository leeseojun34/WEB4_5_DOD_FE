"use client";
import { useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { ko } from "date-fns/locale";

export const Calendar = () => {
  const [selected, setSelected] = useState<Date[]>([]);
  const defaultClassNames = getDefaultClassNames();

  console.log(defaultClassNames);

  return (
    <DayPicker
      ISOWeek
      locale={ko}
      mode="multiple"
      required={true}
      selected={selected}
      onSelect={setSelected}
      navLayout="around"
      showOutsideDays={true}
      formatters={{
        formatCaption: (month) =>
          `${month.getFullYear()}년 ${month.getMonth() + 1}월`,
      }}
      classNames={{
        root: `${defaultClassNames.root} w-[335px] h-full rounded-[20px] bg-[color:var(--color-white)] px-4 py-3 flex justify-center`,
        day: `rounded-full leading-none`,
        caption_label: `font-semibold flex justify-center items-center text-sm`,
        today: `outline outline-[color:var(--color-primary-400)] text-[color:var(--color-primary-400)] box-border w-6 h-6`,
        weekday: `text-[color:var(--color-gray-placeholder)] font-medium text-sm`,
        selected: `bg-[color:var(--color-primary-400)] text-[color:var(--color-white)]`,
        chevron: `${defaultClassNames.chevron} fill-[color:var(--color-black)]! w-[18px] h-[18px]`,
        outside: `text-[color:var(--color-gray-placeholder)]`,
        month_grid: `border-separate border-spacing-4`,
        day_button: `w-6 h-6 text-sm font-medium`,
      }}
      // footer={selected ? `Selected: ${selected}` : "Pick a day."}
    />
  );
};

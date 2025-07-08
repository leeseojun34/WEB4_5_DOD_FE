"use client";
import { useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { ko } from "date-fns/locale";

export const Calendar = () => {
  const [selected, setSelected] = useState<Date>();
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      locale={ko}
      mode="multiple"
      // selected={selected}
      // onSelect={setSelected}
      navLayout="around"
      showOutsideDays={true}
      formatters={{
        formatCaption: (month) =>
          `${month.getFullYear()}년 ${month.getMonth() + 1}월`,
      }}
  
      classNames={{
        day: `rounded-full`,
        today: `border border-[color:var(--color-primary-400)] text-[color:var(--color-primary-400)]`,
        weekday: `text-[color:var(--color-gray-placeholder)] font-medium text-sm`,
        selected: `bg-[color:var(--color-primary-400)] text-[color:var(--color-white)]`,
        root: `${defaultClassNames.root} w-[335px] h-full rounded-lg bg-[color:var(--color-white)] py-3`,
        chevron: `${defaultClassNames.chevron} fill-[color:var(--color-black)]! `,
        outside: `text-[color:var(--color-gray-placeholder)]`,
        month_grid: `border-separate border-spacing-[12px]`,
        day_button: `w-6 h-6 text-sm font-medium leading-none`,
      }}

      //   footer={
      //     selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
      //   }
    />
  );
};

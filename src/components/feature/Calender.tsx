"use client";
import { useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { ko } from "date-fns/locale";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

interface CalendarProps {
  isCompact: boolean;
}

export const Calendar = ({ isCompact }: CalendarProps) => {
  const [selected, setSelected] = useState<Date[] | undefined>([]);
  const [expanded, setExpanded] = useState(false);
  const defaultClassNames = getDefaultClassNames();

  console.log(defaultClassNames);
  const today = new Date();
  console.log(today.getDate());

  const startOfWeek = new Date(today);

  console.log(startOfWeek);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1);
  const weekDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  const hiddenDays =
    isCompact && !expanded
      ? (date: Date) =>
          !weekDates.some(
            (d) => d.toLocaleDateString() === date.toLocaleDateString()
          )
      : undefined;

  return (
    <>
      <DayPicker
        ISOWeek
        locale={ko}
        mode="multiple"
        required={false}
        selected={selected}
        onSelect={setSelected}
        navLayout="around"
        hideNavigation={isCompact && !expanded ? true : false}
        showOutsideDays={true}
        formatters={{
          formatCaption: (month) =>
            `${month.getFullYear()}년 ${month.getMonth() + 1}월`,
        }}
        hidden={hiddenDays}
        classNames={{
          root: `${defaultClassNames.root} w-[335px] h-[full] rounded-[20px] bg-[color:var(--color-white)] px-4 py-3 flex flex-col justify-center items-center `,
          day: `rounded-full leading-none`,
          caption_label: `font-semibold flex justify-center items-center text-sm`,
          today: `outline outline-[color:var(--color-primary-400)] text-[color:var(--color-primary-400)] box-border w-6 h-6`,
          weekday: `text-[color:var(--color-gray-placeholder)] font-medium text-sm`,
          selected: `bg-[color:var(--color-primary-400)] text-[color:var(--color-white)]`,
          chevron: `${defaultClassNames.chevron} fill-[color:var(--color-black)]! w-[18px] h-[18px]`,
          outside: `text-[color:var(--color-gray-placeholder)]`,
          month_grid: `border-separate border-spacing-x-4 border-spacing-y-1`,
          day_button: `w-6 h-6 text-sm font-medium`,
          month_caption: `h-[22px] flex justify-center items-center mb-2`,
          button_next: `${defaultClassNames.button_next} translate-y-[-12px] h-[16px]`,
          button_previous: `${defaultClassNames.button_previous} translate-y-[-12px] h-[16px]`,
        }}
        footer={
          isCompact && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="flex justify-center w-full"
            >
              {expanded ? (
                <IoChevronUp className="w-[14px] h-[14px] text-[color:var(--color-gray-placeholder)]" />
              ) : (
                <IoChevronDown className="w-[14px] h-[14px] text-[color:var(--color-gray-placeholder)]" />
              )}
            </button>
          )
        }
      />
    </>
  );
};

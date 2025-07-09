"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { ko } from "date-fns/locale";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { CalendarProps } from "./types";
import { useWeekDates } from "./hooks/useWeekDates";
import { CalendarChevron } from "./CalendarChevron";
import { DayButton } from "./DayButton";

export const Calendar = ({
  isCompact = false,
  events,
  selected,
  setSelected,
}: CalendarProps) => {
  const [expanded, setExpanded] = useState(false);
  const defaultClassNames = getDefaultClassNames();
  const weekDates = useWeekDates();

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1);

  const hiddenDays =
    isCompact && !expanded
      ? (date: Date) =>
          !weekDates.some(
            (d) => d.toLocaleDateString() === date.toLocaleDateString()
          )
      : undefined;

  const commonProps = {
    ISOWeek: true,
    locale: ko,
    required: false,
    showOutsideDays: true,
    navLayout: "around" as const,
    hideNavigation: isCompact && !expanded,
    hidden: hiddenDays,
    modifiers: { events },
    formatters: {
      formatCaption: (month: Date) =>
        `${month.getFullYear()}년 ${month.getMonth() + 1}월`,
    },
    components: {
      Chevron: CalendarChevron,
      DayButton: DayButton,
    },
    classNames: {
      root: `${defaultClassNames.root} w-[335px] h-full rounded-[20px] bg-[color:var(--color-white)] p-4 flex flex-col justify-center items-center`,
      day: `rounded-full leading-none`,
      caption_label: `font-regular flex justify-center items-center text-sm`,
      today: `text-[color:var(--color-primary-400)] box-border w-6 h-6`,
      weekday: `text-[color:var(--color-gray-placeholder)] font-light text-xs`,
      selected: `bg-[color:var(--color-primary-400)] text-[color:var(--color-white)]`,
      outside: `text-[color:var(--color-gray-placeholder)]`,
      month_grid: `border-separate border-spacing-x-4 ${
        expanded || !isCompact ? "border-spacing-y-4" : "border-spacing-y-1"
      }`,
      day_button: `w-6 h-6 text-sm `,
      month_caption: `h-[22px] flex justify-center items-center ${
        expanded ? "" : "mb-3"
      }`,
      button_next: `${defaultClassNames.button_next} translate-y-[-12px] h-[16px]`,
      button_previous: `${defaultClassNames.button_previous} translate-y-[-12px] h-[16px]`,
    },
    footer: isCompact ? (
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="flex justify-center w-full"
      >
        {expanded ? (
          <IoChevronUp className="w-[14px] h-[14px] text-[color:var(--color-gray-placeholder)] cursor-pointer" />
        ) : (
          <IoChevronDown className="w-[14px] h-[14px] text-[color:var(--color-gray-placeholder)] cursor-pointer" />
        )}
      </button>
    ) : undefined,
  };

  return isCompact ? (
    <DayPicker
      {...commonProps}
      mode="single"
      selected={selected as Date | undefined}
      onSelect={setSelected as Dispatch<SetStateAction<Date | undefined>>}
    />
  ) : (
    <DayPicker
      {...commonProps}
      mode="multiple"
      selected={selected as Date[] | undefined}
      onSelect={setSelected as Dispatch<SetStateAction<Date[] | undefined>>}
    />
  );
};

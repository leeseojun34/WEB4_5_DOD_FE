"use client";

import { useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { ko } from "date-fns/locale";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { CalendarProps } from "./types";
import { useWeekDates } from "./hooks/useWeekDates";
import { CalendarChevron } from "./CalendarChevron";
import { DayButton } from "./DayButton";
import "react-day-picker/style.css";

export const Calendar = (props: CalendarProps) => {
  const { isCompact = false, events } = props;
  const [expanded, setExpanded] = useState(false);
  const defaultClassNames = getDefaultClassNames();
  const weekDates = useWeekDates();

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
      root: `${
        defaultClassNames.root
      } min-w-[335px] w-full max-w-185 h-auto rounded-[20px] bg-[color:var(--color-white)] p-4 flex flex-col justify-center items-center ${
        !isCompact && "border border-[color:var(--color-gray-100)]"
      }`,
      day: `rounded-full leading-none`,
      caption_label: `font-regular flex justify-center items-center text-sm`,
      today: `text-[color:var(--color-primary-400)] box-border w-6 h-6`,
      weekday: `text-[color:var(--color-gray-placeholder)] font-light text-xs`,
      selected: `bg-[color:var(--color-primary-400)] text-[color:var(--color-white)]`,
      outside: `text-[color:var(--color-gray-placeholder)]`,
      month_grid: `border-separate border-spacing-x-4 ${
        expanded || !isCompact ? "border-spacing-y-4" : "border-spacing-y-1"
      }`,
      day_button: `w-6 h-6 text-sm cursor-pointer`,
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

  if (props.isCompact) {
    return (
      <DayPicker
        {...commonProps}
        mode="single"
        selected={props.selected}
        onSelect={props.setSelected}
      />
    );
  }

  if (props.selectionMode === "single") {
    return (
      <DayPicker
        {...commonProps}
        mode="single"
        selected={props.selected}
        onSelect={props.setSelected}
      />
    );
  }

  return (
    <DayPicker
      {...commonProps}
      mode="multiple"
      selected={props.selected}
      onSelect={props.setSelected}
    />
  );
};

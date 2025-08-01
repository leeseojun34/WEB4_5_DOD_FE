"use client";

import { useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { ko } from "date-fns/locale";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { CalendarProps } from "./types";
import { CalendarChevron } from "./CalendarChevron";
import { DayButton } from "./DayButton";
import "react-day-picker/style.css";

export const Calendar = (props: CalendarProps) => {
  const { isCompact = false, events } = props;
  const [expanded, setExpanded] = useState(false);
  const defaultClassNames = getDefaultClassNames();

  const getWeekDatesFromSelected = () => {
    const baseDate = (props.isCompact && props.selected) || new Date();

    const startOfWeek = new Date(baseDate);
    const dayOfWeek = baseDate.getDay();

    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startOfWeek.setDate(baseDate.getDate() - daysToSubtract);

    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  };

  const weekDates = getWeekDatesFromSelected();

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
      day: "rounded-full leading-none w-6 h-6",
      caption_label: "font-regular flex justify-center items-center text-sm",
      today: "text-[color:var(--color-primary-400)] box-border",
      weekday: "text-[color:var(--color-gray-placeholder)] font-light text-xs",
      selected:
        "bg-[color:var(--color-primary-400)] text-[color:var(--color-white)]",
      outside: "text-[color:var(--color-gray-placeholder)]",
      month_grid: `border-separate border-spacing-x-4 border-spacing-y-4`,

      day_button: "w-6 h-6 text-sm cursor-pointer",
      month_caption: `h-[22px] flex justify-center items-center ${
        expanded ? "" : "mb-3"
      }`,
      button_next: `${defaultClassNames.button_next} translate-y-[-12px] h-[16px]`,
      button_previous: `${defaultClassNames.button_previous} translate-y-[-12px] h-[16px]`,
    },
    footer: isCompact ? (
      <ExpandToggleButton
        expanded={expanded}
        onToggle={() => setExpanded((prev) => !prev)}
      />
    ) : undefined,
  };

  if (props.isCompact) {
    const handleDateSelect = (date: Date | undefined) => {
      if (!date) return;

      if (props.selected?.toDateString() === date.toDateString()) return;

      props.setSelected(date);
    };

    return (
      <DayPicker
        {...commonProps}
        mode="single"
        selected={props.selected}
        onSelect={handleDateSelect}
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

interface ExpandToggleButtonProps {
  expanded: boolean;
  onToggle: () => void;
}

const ExpandToggleButton = ({
  expanded,
  onToggle,
}: ExpandToggleButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className="flex justify-center w-full"
      aria-label={expanded ? "달력 축소" : "달력 확장"}
    >
      {expanded ? (
        <IoChevronUp className="w-[14px] h-[14px] text-[color:var(--color-gray-placeholder)] cursor-pointer" />
      ) : (
        <IoChevronDown className="w-[14px] h-[14px] text-[color:var(--color-gray-placeholder)] cursor-pointer" />
      )}
    </button>
  );
};

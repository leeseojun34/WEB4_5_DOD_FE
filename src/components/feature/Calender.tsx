"use client";
import { Dispatch, SetStateAction, useState } from "react";
import {
  CalendarDay,
  DayPicker,
  getDefaultClassNames,
  Modifiers,
} from "react-day-picker";
import "react-day-picker/style.css";
import { ko } from "date-fns/locale";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarProps {
  isCompact?: boolean;
  events?: Date[];
  selected: Date[] | undefined;
  setSelected: Dispatch<SetStateAction<Date[] | undefined>>;
}

export const Calendar = ({
  isCompact = false,
  events,
  selected,
  setSelected,
}: CalendarProps) => {
  const [expanded, setExpanded] = useState(false);
  const defaultClassNames = getDefaultClassNames();

  const today = new Date();

  const startOfWeek = new Date(today);

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
        modifiers={{ answered: events }}
        components={{
          Chevron: ({ orientation }) =>
            orientation === "left" ? (
              <ChevronLeft className="h-4 w-4 stroke-1 translate-x-2" />
            ) : (
              <ChevronRight className="h-4 w-4 stroke-1 translate-x-[-8px]" />
            ),
          DayButton: (
            props: {
              day: CalendarDay;
              modifiers: Modifiers;
            } & React.HTMLAttributes<HTMLButtonElement>
          ) => {
            const { day, modifiers, ...rest } = props;

            return (
              <button
                className={`w-full h-full text-center flex flex-col items-center justify-center p-2 relative`}
                {...rest}
              >
                <div className="w-6 h-6 flex justify-center items-center">
                  {day.date.getDate()}
                </div>
                {modifiers.answered && (
                  <div className="w-full h-1 flex justify-center">
                    <div className="absolute translate-y-1 w-1 h-1 bg-[color:var(--color-primary-400)] rounded-full "></div>
                  </div>
                )}
              </button>
            );
          },
        }}
        classNames={{
          root: `${defaultClassNames.root} w-[335px] h-[full] rounded-[20px] bg-[color:var(--color-white)] p-4 flex flex-col justify-center items-center`,
          day: `rounded-full leading-none`,
          caption_label: `font-regular flex justify-center items-center text-sm`,
          today: `text-[color:var(--color-primary-400)] box-border w-6 h-6`,
          weekday: `text-[color:var(--color-gray-placeholder)] font-light text-xs`,
          selected: `bg-[color:var(--color-primary-400)] text-[color:var(--color-white)]`,
          outside: `text-[color:var(--color-gray-placeholder)]`,
          month_grid: `border-separate border-spacing-x-4 ${
            expanded ? "border-spacing-y-4" : "border-spacing-y-1"
          }`,
          day_button: `w-6 h-6 text-sm `,
          month_caption: `h-[22px] flex justify-center items-center ${
            expanded ? "" : "mb-3"
          }`,
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
                <IoChevronUp className="w-[14px] h-[14px] text-[color:var(--color-gray-placeholder)] cursor-pointer" />
              ) : (
                <IoChevronDown className="w-[14px] h-[14px] text-[color:var(--color-gray-placeholder)] cursor-pointer" />
              )}
            </button>
          )
        }
      />
    </>
  );
};

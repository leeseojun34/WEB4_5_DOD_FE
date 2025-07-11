import { Dispatch, SetStateAction } from "react";

interface CalendarPropsCompact {
  selected: Date | undefined;
  setSelected: Dispatch<SetStateAction<Date | undefined>>;
  isCompact: true;
  events?: Date[];
}

interface CalendarPropsMultiple {
  selected: Date[] | undefined;
  setSelected: Dispatch<SetStateAction<Date[] | undefined>>;
  isCompact?: false;
  events?: Date[];
}

export type CalendarProps = CalendarPropsCompact | CalendarPropsMultiple;

export interface ChevronProps {
  orientation?: "left" | "right" | "up" | "down";
  className?: string;
  size?: number;
  disabled?: boolean;
}

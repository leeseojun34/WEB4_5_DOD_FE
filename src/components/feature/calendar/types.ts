import { Dispatch, SetStateAction } from "react";

interface CalendarPropsCompact {
  isCompact: true;
  events?: Date[];
  selected: Date | undefined;
  setSelected: Dispatch<SetStateAction<Date | undefined>>;
}

interface CalendarPropsMultiple {
  isCompact?: false;
  events?: Date[];
  selected: Date[] | undefined;
  setSelected: Dispatch<SetStateAction<Date[] | undefined>>;
}

export type CalendarProps = CalendarPropsCompact | CalendarPropsMultiple;

export interface ChevronProps {
  orientation?: "left" | "right" | "up" | "down";
  className?: string;
  size?: number;
  disabled?: boolean;
}

import { Dispatch, SetStateAction } from "react";

export type SelectionMode = "single" | "multiple";

interface CalendarBaseProps {
  events?: Date[];
  selectionMode?: SelectionMode;
}

export interface CalendarPropsCompact extends CalendarBaseProps {
  selected: Date | undefined;
  setSelected: Dispatch<SetStateAction<Date | undefined>>;
  isCompact: true;
}

export interface CalendarPropsExpandedSingle extends CalendarBaseProps {
  selected: Date | undefined;
  setSelected: Dispatch<SetStateAction<Date | undefined>>;
  selectionMode: "single";
  isCompact?: false;
}

export interface CalendarPropsExpandedMultiple extends CalendarBaseProps {
  selected: Date[] | undefined;
  setSelected: Dispatch<SetStateAction<Date[] | undefined>>;
  selectionMode?: "multiple";
  isCompact?: false;
}

export type CalendarProps =
  | CalendarPropsCompact
  | CalendarPropsExpandedSingle
  | CalendarPropsExpandedMultiple;

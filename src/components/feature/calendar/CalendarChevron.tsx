import { ChevronLeft, ChevronRight } from "lucide-react";
import { ChevronProps } from "react-day-picker";

export const CalendarChevron = ({
  orientation,
  size,
  disabled,
}: ChevronProps) => {
  const sharedProps = { size, disabled };
  return orientation === "left" ? (
    <ChevronLeft className="h-4 w-4 stroke-1 translate-x-2" {...sharedProps} />
  ) : (
    <ChevronRight
      className="h-4 w-4 stroke-1 translate-x-[-8px]"
      {...sharedProps}
    />
  );
};

import { CalendarDay, Modifiers } from "react-day-picker";
export const DayButton = (
  props: {
    day: CalendarDay;
    modifiers: Modifiers;
  } & React.HTMLAttributes<HTMLButtonElement>
) => {
  const { day, modifiers, ...rest } = props;

  return (
    <button
      className="w-6 h-6 p-2 text-center flex items-center justify-center relative"
      {...rest}
    >
      {day.date.getDate()}
      {modifiers.events && (
        <div className="absolute bottom-[-2px] w-1 h-1 bg-[color:var(--color-primary-400)] rounded-full" />
      )}
    </button>
  );
};

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
      className="w-full h-full text-center flex flex-col items-center justify-center p-2 relative"
      {...rest}
    >
      <div className="w-6 h-6 flex justify-center items-center">
        {day.date.getDate()}
      </div>
      {modifiers.events && (
        <div className="w-full h-1 flex justify-center">
          <div className="absolute translate-y-1 w-1 h-1 bg-[color:var(--color-primary-400)] rounded-full" />
        </div>
      )}
    </button>
  );
};

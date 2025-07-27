import ScheduleSection from "./ScheduleSection";
import ActionMyButton from "./ActionMyButton";

const MySchedule = ({
  eventScheduleInfo,
}: {
  eventScheduleInfo: EventScheduleInfoType;
}) => {
  console.log(eventScheduleInfo);

  return (
    <div className="pt-6 px-5 pb-9 flex flex-col w-full items-center gap-7 sm:gap-8 sm:pt-10">
      <ScheduleSection
        title={
          <>
            <span className="text-[color:var(--color-primary-400)]">나</span>의
            가능한 시간대
          </>
        }
        showLoadButton={true}
        eventScheduleInfo={eventScheduleInfo}
        mode="my"
      />
      <ActionMyButton />
    </div>
  );
};
export default MySchedule;

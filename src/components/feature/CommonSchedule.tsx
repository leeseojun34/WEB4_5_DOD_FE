/**
 * 일정 등록 페이지
 *
 * @param eventScheduleInfo 모든 인원 일정 정보
 *
 * @returns 일정 등록 페이지 컴포넌트
 */

const STYLES = {
  container: "pl-3 pr-6 w-full",
  header: "sticky top-0 z-10 bg-white",
  dayGrid: "grid gap-1 pl-6",
  dayCell: "py-2 text-center text-[#9EA6B2] text-[8px] md:text-xl font-bold",
  dayText: "block",
  dateText: "text-[var(--color-primary-400)]",
  timeColumn: "flex w-6 flex-col items-end gap-1 pr-1",
  timeCell: "h-10 md:h-20 text-right pr-1",
  timeText:
    "block text-[#9EA6B2] text-[8px] md:text-base font-bold translate-y-0",
  scheduleGrid: `grid flex-1 gap-1 md:gap-4`,
  dayColumn: "flex flex-col gap-2 overflow-hidden rounded-lg",
  timeSlot:
    "w-full h-5 md:h-10 border-b border-white last:border-b-0 odd:border-dashed even:border-solid transition-colors duration-150",
  unselectedSlot: "bg-[var(--color-muted)]",
};

// TODO: 모든 인원의 시간 체크 여부 검사 필요

const Schedule = ({
  eventScheduleInfo,
}: {
  eventScheduleInfo: EventScheduleInfoType;
}) => {
  console.log(eventScheduleInfo);
  let daysOfWeek: DayInfo[] = [];
  let hourCount = 24; // 시간 수
  const timeSlotsPerHour = 2; // 시간당 슬롯 수
  let totalTimeSlots = hourCount * timeSlotsPerHour; // 총 시간 슬롯 수
  let dayCount = 7; // 요일 수

  let startTime: string[] = ["00", "00"];
  let endTime: string[] = ["24", "00"];

  daysOfWeek = eventScheduleInfo.timeTable.dates.map((item) => ({
    day: item.dayOfWeek,
    date: item.displayDate,
    fullDate: item.date,
  }));
  startTime = eventScheduleInfo.timeTable.startTime.split(":");
  endTime = eventScheduleInfo.timeTable.endTime.split(":");
  hourCount = Number(endTime[0]) - Number(startTime[0]);
  totalTimeSlots = hourCount * timeSlotsPerHour;
  if (startTime[1] !== "00") {
    hourCount += 1;
  }
  if (endTime[1] !== "00") {
    hourCount += 1;
  }
  dayCount = eventScheduleInfo.timeTable.dates.length;

  // 요일 및 날짜 헤더를 렌더링
  const renderDayHeader = (dayInfo: DayInfo, index: number) => (
    <div key={index} className={STYLES.dayCell}>
      <span className={STYLES.dayText}>{dayInfo.day}</span>
      <span className={STYLES.dateText}>{dayInfo.date}</span>
    </div>
  );

  // 왼쪽의 시간(0~23시) 열을 렌더링
  const renderTimeColumn = () => (
    <div className={STYLES.timeColumn}>
      <div>
        {Array.from({ length: hourCount }).map((_, index) => (
          <div key={index} className={STYLES.timeCell}>
            <span className={STYLES.timeText}>
              {index + Number(startTime[0])}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  // 시간 셀 하나를 렌더링 (선택/비선택 상태 포함)
  const renderTimeSlot = (timeIndex: number) => {
    return (
      <div
        key={timeIndex}
        className={`${STYLES.timeSlot} bg-[var(--color-muted)]`}
      />
    );
  };

  // 한 요일의 모든 시간 셀을 렌더링
  const renderDayColumn = (dayIndex: number) => (
    <div
      key={dayIndex}
      className={STYLES.dayColumn}
      id={`schedule-${dayIndex}`}
    >
      <div>
        {Array.from({ length: totalTimeSlots }).map((_, timeIndex) =>
          renderTimeSlot(timeIndex)
        )}
      </div>
    </div>
  );

  return (
    <div className={STYLES.container}>
      <div className="flex flex-col">
        <div className={STYLES.header}>
          <div className={`${STYLES.dayGrid} grid-cols-${dayCount}`}>
            {daysOfWeek.map(renderDayHeader)}
          </div>
        </div>

        <div className="flex flex-1">
          {renderTimeColumn()}
          <div className={`${STYLES.scheduleGrid} grid-cols-${dayCount}`}>
            {Array.from({ length: dayCount }).map((_, dayIndex) =>
              renderDayColumn(dayIndex)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;

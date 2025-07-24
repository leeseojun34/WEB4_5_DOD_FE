/**
 * 일정 등록 페이지
 *
 * @param eventScheduleInfo 모든 인원 일정 정보
 *
 * @returns 일정 등록 페이지 컴포넌트
 */

import { getGridColsClass } from "@/app/utils/styleFormat";

const STYLES = {
  container: "w-full",
  header: "sticky top-0 z-10 bg-white",
  dayGrid: "grid gap-1 pl-6",
  dayCell: "py-2 text-center text-[#9EA6B2] text-[8px] sm:text-xl font-bold",
  dayText: "block",
  dateText: "text-[var(--color-primary-400)]",
  timeColumn: "flex w-6 flex-col items-end gap-1 pr-1",
  timeCell: "h-10 sm:h-20 text-right pr-1",
  timeText:
    "block text-[#9EA6B2] text-[8px] sm:text-base font-bold translate-y-0",
  scheduleGrid: `grid flex-1 gap-1 sm:gap-4`,
  dayColumn: "flex flex-col gap-2 overflow-hidden rounded-lg",
  timeSlot:
    "w-full h-5 sm:h-10 border-b border-white last:border-b-0 odd:border-dashed even:border-solid transition-colors duration-150",
  unselectedSlot: "bg-[var(--color-muted)]",
};

const RANK_COLOR_CLASS = {
  1: "bg-[var(--color-primary-400)]",
  2: "bg-[var(--color-primary-300)]",
  3: "bg-[var(--color-primary-200)]",
  4: "bg-[var(--color-primary-100)]",
};

const CommonSchedule = ({
  eventScheduleInfo,
}: {
  eventScheduleInfo: EventScheduleInfoType;
}) => {
  const daysOfWeek: DayInfo[] = eventScheduleInfo.timeTable.dates.map(
    (item) => ({
      day: item.dayOfWeek,
      date: item.displayDate,
      fullDate: item.date,
    })
  );
  let hourCount = 24; // 시간 수
  const timeSlotsPerHour = 2; // 시간당 슬롯 수
  let totalTimeSlots = hourCount * timeSlotsPerHour; // 총 시간 슬롯 수
  let dayCount = 7; // 요일 수

  let startTime: string[] = ["00", "00"];
  let endTime: string[] = ["24", "00"];

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

  const participantCounts = eventScheduleInfo.participantCounts;

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
  const renderTimeSlot = (timeIndex: number, dayIndex: number) => {
    const dateKey = daysOfWeek[dayIndex].fullDate || "";
    const countsForDate = participantCounts[dateKey] || [];
    const currentCount = countsForDate[timeIndex] || 0;

    // 모든 참여자 수를 배열로 모음
    const allCounts: number[] = [];
    Object.values(participantCounts).forEach((countsArr) => {
      allCounts.push(...countsArr);
    });

    // 중복 제거 후 내림차순 정렬, 0인 값 제외
    const uniqueCounts = Array.from(
      new Set(allCounts.filter((count) => count > 0))
    ).sort((a, b) => b - a);

    // 상위 4개 값만 랭크 부여
    const top4Counts = uniqueCounts.slice(0, 4);

    // 현재 슬롯의 랭크 계산
    const rank = top4Counts.indexOf(currentCount) + 1;

    const bgColorClass =
      rank >= 1 && rank <= 4
        ? RANK_COLOR_CLASS[rank as keyof typeof RANK_COLOR_CLASS]
        : STYLES.unselectedSlot;

    return (
      <div key={timeIndex} className={`${STYLES.timeSlot} ${bgColorClass}`} />
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
          renderTimeSlot(timeIndex, dayIndex)
        )}
      </div>
    </div>
  );

  return (
    <div className={STYLES.container}>
      <div className="flex flex-col">
        <div className={STYLES.header}>
          <div className={`${STYLES.dayGrid} ${getGridColsClass(dayCount)}`}>
            {daysOfWeek.map(renderDayHeader)}
          </div>
        </div>

        <div className="flex flex-1">
          {renderTimeColumn()}
          <div
            className={`${STYLES.scheduleGrid} ${getGridColsClass(dayCount)}`}
          >
            {Array.from({ length: dayCount }).map((_, dayIndex) =>
              renderDayColumn(dayIndex)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonSchedule;

/**
 * 일정 등록 페이지
 *
 * TODO:
 * data, startTime, endTime, timeBit, dayList, memberCount
 * dayList 로 날짜 및 요일 구성 -> day.js ?
 * 내가 가능한 시간 설정이면 날짜 빼고 진행 요일만 추가 해서 진행
 * 비트 값으로 넘어오는 값으로 색칠 ex) 0000_0000_0000_1111 -> 1 일때 색칠 및 시간 범위 확인
 * 그룹원 모두 가능한 일정은 전체 인원수로 % 줘서 색상 진하게 -> 인원수 확인 필요
 * map 반복 중인 배열 기준으로 연산한 값으로 바꿔주기
 *
 * @returns 일정 등록 페이지 컴포넌트
 */

import { useState, useRef, useCallback } from "react";

// 타입 정의
// type ScheduleProps = {}

interface DayInfo {
  day: string;
  date: string;
}

// 요일 및 날짜 정의
const DAYS_OF_WEEK: DayInfo[] = [
  { day: "MON", date: "07.13" },
  { day: "TUE", date: "07.14" },
  { day: "WED", date: "07.15" },
  { day: "THU", date: "07.16" },
  { day: "FRI", date: "07.17" },
  { day: "SAT", date: "07.18" },
  { day: "SUN", date: "07.19" },
];

const HOURS_COUNT = 24; // 시간 수
const TIME_SLOTS_PER_HOUR = 2; // 시간당 슬롯 수
const TOTAL_TIME_SLOTS = HOURS_COUNT * TIME_SLOTS_PER_HOUR; // 총 시간 슬롯 수
const DAYS_COUNT = 7; // 요일 수

const STYLES = {
  container: "pl-3 pr-6",
  header: "sticky top-0 z-10 bg-white",
  dayGrid: "grid grid-cols-7 gap-1 pl-6",
  dayCell: "py-2 text-center text-[#9EA6B2] text-[8px] md:text-xl font-bold",
  dayText: "block",
  dateText: "text-[var(--color-primary-400)]",
  timeColumn: "flex w-6 flex-col items-end gap-1 pr-1",
  timeCell: "h-10 md:h-20 text-right pr-1",
  timeText:
    "block text-[#9EA6B2] text-[8px] md:text-base font-bold translate-y-0",
  scheduleGrid: "grid flex-1 grid-cols-7 gap-1 md:gap-4",
  dayColumn: "flex flex-col gap-2 overflow-hidden rounded-lg",
  timeSlot:
    "w-full h-5 md:h-10 border-b border-white last:border-b-0 odd:border-dashed even:border-solid cursor-pointer transition-colors duration-150",
  selectedSlot: "bg-[var(--color-primary-400)]",
  unselectedSlot: "bg-[var(--color-muted)]",
} as const;

const Schedule = () => {
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartCell, setDragStartCell] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const getCellId = useCallback(
    (dayIndex: number, timeIndex: number): string => {
      return `cell-${dayIndex}-${timeIndex}`;
    },
    []
  );

  const toggleCellSelection = useCallback((cellId: string): void => {
    setSelectedCells((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cellId)) {
        newSet.delete(cellId);
      } else {
        newSet.add(cellId);
      }
      return newSet;
    });
  }, []);

  const handleMouseDown = useCallback(
    (dayIndex: number, timeIndex: number): void => {
      const cellId = getCellId(dayIndex, timeIndex);
      setIsDragging(true);
      setDragStartCell(cellId);
      toggleCellSelection(cellId);
    },
    [getCellId, toggleCellSelection]
  );

  const handleMouseEnter = useCallback(
    (dayIndex: number, timeIndex: number): void => {
      if (!isDragging || !dragStartCell) return;

      const cellId = getCellId(dayIndex, timeIndex);
      toggleCellSelection(cellId);
    },
    [isDragging, dragStartCell, getCellId, toggleCellSelection]
  );

  const handleMouseUp = useCallback((): void => {
    setIsDragging(false);
    setDragStartCell(null);
  }, []);

  const handleMouseLeave = useCallback((): void => {
    if (isDragging) {
      setIsDragging(false);
      setDragStartCell(null);
    }
  }, [isDragging]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent, dayIndex: number, timeIndex: number): void => {
      e.preventDefault();
      const cellId = getCellId(dayIndex, timeIndex);
      setIsDragging(true);
      setDragStartCell(cellId);
      toggleCellSelection(cellId);
    },
    [getCellId, toggleCellSelection]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent): void => {
      if (!isDragging || !dragStartCell) return;

      e.preventDefault();
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (!target) return;

      const id = (target as HTMLElement).id;
      if (id.startsWith("cell-")) {
        toggleCellSelection(id);
      }
    },
    [isDragging, dragStartCell, toggleCellSelection]
  );

  const renderDayHeader = (dayInfo: DayInfo, index: number) => (
    <div key={index} className={STYLES.dayCell}>
      <span className={STYLES.dayText}>{dayInfo.day}</span>
      <span className={STYLES.dateText}>{dayInfo.date}</span>
    </div>
  );

  const renderTimeColumn = () => (
    <div className={STYLES.timeColumn}>
      <div>
        {Array.from({ length: HOURS_COUNT }).map((_, index) => (
          <div key={index} className={STYLES.timeCell}>
            <span className={STYLES.timeText}>{index}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTimeSlot = (dayIndex: number, timeIndex: number) => {
    const cellId = getCellId(dayIndex, timeIndex);
    const isSelected = selectedCells.has(cellId);

    return (
      <div
        key={timeIndex}
        id={cellId}
        className={`${STYLES.timeSlot} ${
          isSelected ? STYLES.selectedSlot : STYLES.unselectedSlot
        }`}
        onMouseDown={() => handleMouseDown(dayIndex, timeIndex)}
        onMouseEnter={() => handleMouseEnter(dayIndex, timeIndex)}
        onTouchStart={(e) => handleTouchStart(e, dayIndex, timeIndex)}
        onTouchMove={handleTouchMove}
      />
    );
  };

  const renderDayColumn = (dayIndex: number) => (
    <div
      key={dayIndex}
      className={STYLES.dayColumn}
      id={`schedule-${dayIndex}`}
    >
      <div>
        {Array.from({ length: TOTAL_TIME_SLOTS }).map((_, timeIndex) =>
          renderTimeSlot(dayIndex, timeIndex)
        )}
      </div>
    </div>
  );

  return (
    <div
      className={STYLES.container}
      ref={containerRef}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col">
        <div className={STYLES.header}>
          <div className={STYLES.dayGrid}>
            {DAYS_OF_WEEK.map(renderDayHeader)}
          </div>
        </div>

        <div className="flex flex-1">
          {renderTimeColumn()}
          <div className={STYLES.scheduleGrid}>
            {Array.from({ length: DAYS_COUNT }).map((_, dayIndex) =>
              renderDayColumn(dayIndex)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;

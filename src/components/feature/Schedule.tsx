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

  // 주어진 dayIndex와 timeIndex로 고유한 셀 ID를 생성
  const getCellId = useCallback(
    (dayIndex: number, timeIndex: number): string => {
      return `cell-${dayIndex}-${timeIndex}`;
    },
    []
  );

  // 셀 ID의 선택 상태를 토글 (선택되었으면 해제, 아니면 선택)
  const toggleCellSelection = useCallback((cellId: string) => {
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

  // 마우스 클릭으로 드래그 시작 및 해당 셀 선택
  const handleMouseDown = useCallback(
    (dayIndex: number, timeIndex: number) => {
      const cellId = getCellId(dayIndex, timeIndex);
      setIsDragging(true);
      setDragStartCell(cellId);
      toggleCellSelection(cellId);
    },
    [getCellId, toggleCellSelection]
  );

  // 마우스가 셀 위로 이동할 때 셀 선택 (드래그 중일 경우)
  const handleMouseEnter = useCallback(
    (dayIndex: number, timeIndex: number) => {
      if (!isDragging || !dragStartCell) return;

      const cellId = getCellId(dayIndex, timeIndex);
      toggleCellSelection(cellId);
    },
    [isDragging, dragStartCell, getCellId, toggleCellSelection]
  );

  // 마우스 클릭 종료 시 드래그 상태 초기화
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragStartCell(null);
  }, []);

  // 마우스가 영역을 벗어나면 드래그 상태 초기화
  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      setDragStartCell(null);
    }
  }, [isDragging]);

  // 터치 시작 시 드래그 시작 및 해당 셀 선택
  const handleTouchStart = useCallback(
    (e: React.TouchEvent, dayIndex: number, timeIndex: number) => {
      const cellId = getCellId(dayIndex, timeIndex);
      setIsDragging(true);
      setDragStartCell(cellId);
      toggleCellSelection(cellId);
    },
    [getCellId, toggleCellSelection]
  );

  // 터치 이동 시 셀 위에 있으면 선택 처리
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || !dragStartCell) return;

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
        {Array.from({ length: HOURS_COUNT }).map((_, index) => (
          <div key={index} className={STYLES.timeCell}>
            <span className={STYLES.timeText}>{index}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // 시간 셀 하나를 렌더링 (선택/비선택 상태 포함)
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

  // 한 요일의 모든 시간 셀을 렌더링
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

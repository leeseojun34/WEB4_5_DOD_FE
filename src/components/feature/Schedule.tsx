/**
 * 일정 등록 페이지
 *
 * @param eventScheduleInfo 이벤트 일정 정보 optional
 * @param mySchedule 내 일정 정보 optional
 * @param mode 모드 (default: 이벤트 일정 등록, mypage: 내 일정 등록)
 * @returns 일정 등록 페이지 컴포넌트
 */
"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  convertTimesToHexBit,
  convertHexBitToTimes,
} from "@/app/utils/timebitFormat";
import { setEventMyTimeApi, setMySchedule } from "@/lib/api/scheduleApi";
import { useParams } from "next/navigation";
import { getGridColsClass } from "@/app/utils/styleFormat";

const STYLES = {
  container: "w-full px-2",
  header: "sticky top-0 z-10 bg-white",
  dayGrid: "grid gap-1 pl-6",
  dayCell: "py-2 text-center text-[#9EA6B2] text-[8px] sm:text-lg font-bold",
  dayText: "block",
  dateText: "text-[var(--color-primary-400)]",
  timeColumn: "flex w-6 flex-col items-end gap-1 pr-1",
  timeCell: "h-10 sm:h-20 text-right pr-1",
  timeText:
    "block text-[#9EA6B2] text-[8px] sm:text-base font-bold translate-y-0",
  scheduleGrid: `grid flex-1 gap-1 sm:gap-4`,
  dayColumn: "flex flex-col gap-2 overflow-hidden rounded-lg",
  timeSlot:
    "w-full h-5 sm:h-10 border-b border-white last:border-b-0 odd:border-dashed even:border-solid cursor-pointer transition-colors duration-150",
  unselectedSlot: "bg-[var(--color-muted)]",
};

const Schedule = ({
  eventScheduleInfo,
  mySchedule,
  timeSlots,
  mode = "default",
}: {
  eventScheduleInfo?: EventTimeTableType;
  mySchedule: MyScheduleType | null;
  timeSlots?: { date: string; timeBit: string }[];
  mode?: "default" | "mypage";
}) => {
  const { eventId } = useParams();

  let daysOfWeek: DayInfo[] = [];
  let hourCount = 24; // 시간 수
  const timeSlotsPerHour = 2; // 시간당 슬롯 수
  let totalTimeSlots = hourCount * timeSlotsPerHour; // 총 시간 슬롯 수
  let dayCount = 7; // 요일 수

  let startTime: string[] = ["00"];
  let endTime: string[] = ["23"];

  if (!eventScheduleInfo) {
    daysOfWeek = [
      { day: "MON" },
      { day: "TUE" },
      { day: "WED" },
      { day: "THU" },
      { day: "FRI" },
      { day: "SAT" },
      { day: "SUN" },
    ];
  } else {
    daysOfWeek = eventScheduleInfo.dates.map((item) => ({
      day: item.dayOfWeek,
      date: item.displayDate,
      fullDate: item.date,
    }));
    startTime = eventScheduleInfo.startTime.split(":");
    endTime = eventScheduleInfo.endTime.split(":");
    hourCount = Number(endTime[0]) - Number(startTime[0]);
    dayCount = eventScheduleInfo.dates.length;
    totalTimeSlots = hourCount * timeSlotsPerHour;
  }

  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [checkedCells, setCheckedCells] = useState<Map<string, Set<string>>>(
    new Map()
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartCell, setDragStartCell] = useState<string | null>(null);
  const [isDraggingAndClick, setIsDraggingAndClick] = useState(true);
  const [isInteractionEnabled, setIsInteractionEnabled] = useState(
    mode !== "mypage"
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const getTimeString = (startHour: number, index: number): string => {
    const hour = startHour + Math.floor(index / 2);
    const minute = index % 2 === 0 ? "00" : "30";
    return `${String(hour).padStart(2, "0")}:${minute}`;
  };

  const [isMyScheduleChanged, setIsMyScheduleChanged] = useState(false);

  useEffect(() => {
    if (!timeSlots) return;
    setCheckedCells(new Map());
    for (const timeSlot of timeSlots) {
      const dayIndex = daysOfWeek.findIndex(
        (d) => d.fullDate === timeSlot.date
      );
      const timeBit = timeSlot.timeBit;
      const times = convertHexBitToTimes(timeBit);
      for (const time of times) {
        const cellId = `cell-${dayIndex}-${time}`;
        setSelectedCells((prev) => {
          const newSet = new Set(prev);
          newSet.add(cellId);
          return newSet;
        });
      }
    }
    setIsMyScheduleChanged(false);
  }, [timeSlots]);

  useEffect(() => {
    if (!mySchedule) return;
    if (mode === "mypage") {
      setCheckedCells(new Map());
    }
    setSelectedCells(new Set());

    setIsMyScheduleChanged(false);
    const timeBitArray = {
      FRI: "",
      MON: "",
      SAT: "",
      SUN: "",
      THU: "",
      TUE: "",
      WED: "",
    };

    Object.entries(mySchedule).forEach(([day, timeBit]) => {
      if (day.includes("Fri")) timeBitArray.FRI = timeBit;
      else if (day.includes("Mon")) timeBitArray.MON = timeBit;
      else if (day.includes("Sat")) timeBitArray.SAT = timeBit;
      else if (day.includes("Sun")) timeBitArray.SUN = timeBit;
      else if (day.includes("Thu")) timeBitArray.THU = timeBit;
      else if (day.includes("Tue")) timeBitArray.TUE = timeBit;
      else if (day.includes("Wed")) timeBitArray.WED = timeBit;
    });

    const allCellIds = new Set<string>();

    for (let i = 0; i < daysOfWeek.length; i++) {
      const day = daysOfWeek[i];
      const timeBit = timeBitArray[day.day as keyof typeof timeBitArray];
      const times = convertHexBitToTimes(timeBit);
      const date = mode === "default" ? day.fullDate! : i.toString();

      if (!date) continue;

      times.forEach((time) => {
        if (mode === "default") {
          const dayIndex = daysOfWeek.findIndex((d) => d.fullDate === date);
          const cellId = `cell-${dayIndex}-${time}`;
          allCellIds.add(cellId);
        } else {
          const cellId = `cell-${i}-${time}`;
          allCellIds.add(cellId);
        }
      });
    }

    setSelectedCells(allCellIds);
    // applyXorToggle는 selectedCells 상태가 바뀐 이후에만 작동하도록 selectedCells에 대한 useEffect로 이동함

    if (mode === "mypage") {
      setTimeout(() => {
        setIsInteractionEnabled(true);
      }, 300);
    } else {
      setIsMyScheduleChanged(true);
    }
  }, [mySchedule]);

  useEffect(() => {
    if (selectedCells.size > 0 && !isDragging) {
      applyXorToggle();
    }
  }, [selectedCells]);

  const applyXorToggle = async () => {
    if (selectedCells.size === 0) return;
    setIsDraggingAndClick(false);

    const updatedCheckedCells = new Map(checkedCells);
    const groupedByDate: Record<string, string[]> = {};

    for (const cellId of selectedCells) {
      const [, dayIndexStr, time] = cellId.split("-");
      const dayIndex = Number(dayIndexStr);
      let date = "";
      if (mode === "mypage") {
        if (dayIndexStr === "0") {
          date = "timeBitMon";
        } else if (dayIndexStr === "1") {
          date = "timeBitTue";
        } else if (dayIndexStr === "2") {
          date = "timeBitWed";
        } else if (dayIndexStr === "3") {
          date = "timeBitThu";
        } else if (dayIndexStr === "4") {
          date = "timeBitFri";
        } else if (dayIndexStr === "5") {
          date = "timeBitSat";
        } else if (dayIndexStr === "6") {
          date = "timeBitSun";
        }
      } else {
        date = daysOfWeek[dayIndex].fullDate!;
      }

      let dateSet: Set<string>;
      if (mode === "mypage") {
        dateSet = updatedCheckedCells.get(dayIndexStr) ?? new Set();
      } else {
        dateSet = updatedCheckedCells.get(date) ?? new Set();
      }

      if (dateSet.has(time)) {
        dateSet.delete(time);
      } else {
        dateSet.add(time);
      }

      if (mode === "mypage") {
        updatedCheckedCells.set(dayIndexStr, dateSet);
      } else {
        updatedCheckedCells.set(date, dateSet);
      }

      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }
      groupedByDate[date].push(time);
    }

    if (mode !== "mypage") {
      const dailyTimeSlots = Object.entries(groupedByDate)
        .filter(([, times]) => times.length > 0)
        .map(([date, times]) => ({
          date,
          timeBit: convertTimesToHexBit(times),
        }));

      if (dailyTimeSlots.length > 0 && isMyScheduleChanged) {
        await setEventMyTimeApi(+eventId!, {
          dailyTimeSlots,
          timezone: "Asia/Seoul",
        });
      }
    } else {
      const newMySchedule: Record<string, string> = {};
      for (const date in groupedByDate) {
        newMySchedule[date] = convertTimesToHexBit(groupedByDate[date]);
      }

      if (isMyScheduleChanged) {
        await setMySchedule(newMySchedule);
        setIsMyScheduleChanged(false);
      }
    }

    setCheckedCells(updatedCheckedCells);
    setSelectedCells(new Set());

    setTimeout(() => {
      setIsDraggingAndClick(true);
    }, 300); // adjust delay as needed
  };

  useEffect(() => {
    if (!isDragging) {
      applyXorToggle();
    }
  }, [isDragging]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchMoveDOM = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const isTimeSlot = target?.classList?.contains("cursor-pointer"); // 시간셀인지 확인

      if (isDragging && isTimeSlot) {
        e.preventDefault(); // 오직 시간 셀을 터치 중일 때만 preventDefault
      }
    };

    container.addEventListener("touchmove", handleTouchMoveDOM, {
      passive: false,
    });

    return () => {
      container.removeEventListener("touchmove", handleTouchMoveDOM);
    };
  }, [isDragging]);

  // 주어진 dayIndex와 timeIndex로 고유한 셀 ID를 생성
  const getCellId = useCallback(
    (dayIndex: number, timeIndex: number): string => {
      const timeStr = getTimeString(Number(startTime[0]), timeIndex);
      return `cell-${dayIndex}-${timeStr}`;
    },
    [startTime]
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
      if (!isDraggingAndClick || !isInteractionEnabled) return;
      const cellId = getCellId(dayIndex, timeIndex);
      setIsMyScheduleChanged(true);
      setIsDragging(true);
      setDragStartCell(cellId);
      toggleCellSelection(cellId);
    },
    [getCellId, toggleCellSelection, isDraggingAndClick, isInteractionEnabled]
  );

  // 마우스가 셀 위로 이동할 때 셀 선택 (드래그 중일 경우)
  const handleMouseEnter = useCallback(
    (dayIndex: number, timeIndex: number) => {
      if (!isDraggingAndClick || !isInteractionEnabled) return;
      if (!isDragging || !dragStartCell) return;

      const [, startDayIndex] = dragStartCell.split("-");
      if (Number(startDayIndex) !== dayIndex) return;

      const cellId = getCellId(dayIndex, timeIndex);
      toggleCellSelection(cellId);
    },
    [
      isDragging,
      dragStartCell,
      getCellId,
      toggleCellSelection,
      isDraggingAndClick,
      isInteractionEnabled,
    ]
  );

  // 마우스 클릭 종료 시 드래그 상태 초기화
  const handleMouseUp = useCallback(async () => {
    if (!isDraggingAndClick || !isInteractionEnabled) return;
    setIsDragging(false);
    setDragStartCell(null);
  }, [isDraggingAndClick, isInteractionEnabled]);

  // 마우스가 영역을 벗어나면 드래그 상태 초기화
  const handleMouseLeave = useCallback(() => {
    if (!isDraggingAndClick || !isInteractionEnabled) return;
    if (isDragging) {
      setIsDragging(false);
      setDragStartCell(null);
    }
  }, [isDragging, isDraggingAndClick, isInteractionEnabled]);

  const lastTouchedCell = useRef<string | null>(null);

  // 터치 시작 시 드래그 시작 (셀 선택은 하지 않음, 중복 방지용 lastTouchedCell 설정)
  const handleTouchStart = useCallback(
    (e: React.TouchEvent, dayIndex: number, timeIndex: number) => {
      if (!isDraggingAndClick || !isInteractionEnabled) return;
      const cellId = getCellId(dayIndex, timeIndex);
      setIsMyScheduleChanged(true);
      setIsDragging(true);
      setDragStartCell(cellId);
      lastTouchedCell.current = cellId; // 중복 방지를 위해 초기 설정
      // 첫 터치에서 이미 터치무브로 선택될 수 있으므로 이 시점에는 선택하지 않음
    },
    [getCellId, isDraggingAndClick, isInteractionEnabled]
  );

  // 터치 이동 시 셀 위에 있으면 선택 처리
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDraggingAndClick || !isInteractionEnabled) return;
      if (!isDragging || !dragStartCell) return;

      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (!target) return;

      const id = (target as HTMLElement).id;
      if (!id.startsWith("cell-")) return;

      const [, dayIndexStr] = id.split("-");
      const [, dragStartDayIndex] = dragStartCell.split("-");
      if (dayIndexStr !== dragStartDayIndex) return;

      if (lastTouchedCell.current !== id) {
        toggleCellSelection(id);
        lastTouchedCell.current = id; // 마지막 셀 ID 저장
      }
    },
    [
      isDragging,
      dragStartCell,
      toggleCellSelection,
      isDraggingAndClick,
      isInteractionEnabled,
    ]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDraggingAndClick || !isInteractionEnabled) return;
    setIsDragging(false);
    setDragStartCell(null);
    lastTouchedCell.current = null;
  }, [isDraggingAndClick, isInteractionEnabled]);

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
  const renderTimeSlot = (dayIndex: number, timeIndex: number) => {
    const cellId = getCellId(dayIndex, timeIndex);
    const timeStr = getTimeString(Number(startTime[0]), timeIndex);
    let isChecked = false;

    if (mode === "mypage") {
      isChecked = checkedCells.get(dayIndex.toString())?.has(timeStr) ?? false;
    } else {
      isChecked =
        checkedCells.get(daysOfWeek[dayIndex]?.fullDate || "")?.has(timeStr) ??
        false;
    }
    const isSelected = selectedCells.has(cellId);
    let slotClass = STYLES.unselectedSlot;
    if (isSelected) {
      slotClass = "bg-[var(--color-primary-300)]";
    } else if (isChecked) {
      slotClass = "bg-[var(--color-primary-400)]";
    }

    return (
      <div
        key={timeIndex}
        id={cellId}
        className={`${STYLES.timeSlot} ${slotClass}`}
        onMouseDown={() => handleMouseDown(dayIndex, timeIndex)}
        onMouseEnter={() => handleMouseEnter(dayIndex, timeIndex)}
        onTouchStart={(e) => handleTouchStart(e, dayIndex, timeIndex)}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
        {Array.from({ length: totalTimeSlots }).map((_, timeIndex) => {
          return renderTimeSlot(dayIndex, timeIndex);
        })}
      </div>
    </div>
  );

  return (
    <div
      className={STYLES.container}
      ref={containerRef}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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

export default Schedule;

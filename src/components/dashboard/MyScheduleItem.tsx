import { AtSign } from "lucide-react";

export const MyScheduleItem = () => {
  return (
    <>
      <div className="flex gap-5 w-full items-center">
        <div className="flex items-center justify-center w-18 h-[50px] bg-[color:var(--color-gray-background)] text-[color:var(--color-primary-400)] rounded-lg">
          D-DAY
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-[color:var(--color-black)] text-sm font-semibold w-[150px] sm:w-[320px] truncate">
            {/* 일정 이름 */}
            고양이 정모
          </div>
          <div className="text-[color:var(--color-gray)] font-regular text-xs">
            {/* 일정 시간 */}
            18:00 - 22:00
          </div>
          <div className="flex items-center gap-1">
            {/* 온오프라인 장소 정보 */}
            <AtSign className="w-3 h-[14px] text-[color:var(--color-gray-placeholder)]" />
            <p className="text-xs text-[color:var(--color-gray-placeholder)]">
              Google Meet
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

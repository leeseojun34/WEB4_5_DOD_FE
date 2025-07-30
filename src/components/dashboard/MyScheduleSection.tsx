import { ArrowRight } from "lucide-react";
import { MyScheduleItem } from "./MyScheduleItem";
import Link from "next/link";
import { DashboardScheduleType } from "@/lib/api/dashboardApi";
import { useRouter } from "next/navigation";

interface MyScheduleSectionProps {
  selectedDate: Date;
  schedules: DashboardScheduleType[];
  userId: string;
}

export const MyScheduleSection = ({
  selectedDate,
  schedules,
  userId,
}: MyScheduleSectionProps) => {
  const filteredSchedules = schedules.filter((schedule) => {
    const scheduleDate = new Date(schedule.startTime).toLocaleDateString(
      "ko-KR"
    );
    const selected = selectedDate.toLocaleDateString("ko-KR");
    const isDateMatch = scheduleDate === selected;

    const isActivated = schedule.activated === true;
    return isDateMatch && isActivated;
  });

  return (
    <>
      <div className="bg-[color:var(--color-white)] p-6 rounded-[20px] w-full gap-2 flex flex-col  min-w-[335px]">
        <div className="flex justify-between">
          <p className="font-semibold text-base text-[color:var(--color-black)]">
            나의 일정
          </p>
          <Link href={`/schedule/user/${userId}`}>
            <button className="hover:font-medium text-xs text-[color:var(--color-gray-placeholder)] cursor-pointer">
              일정 모두 보기
            </button>
          </Link>
        </div>
        {filteredSchedules.length > 0 ? (
          filteredSchedules.map((schedule) => {
            if (schedule.source === "SERVICE") {
              return (
                <Link href={`/schedule/${schedule.id}`} key={schedule.id}>
                  <MyScheduleItem schedule={schedule} />
                </Link>
              );
            } else {
              return (
                <MyScheduleItem
                  key={schedule.googleEventId}
                  schedule={schedule}
                />
              );
            }
          })
        ) : (
          <div className="flex flex-1 justify-center items-center py-4">
            <EmptySchedule />
          </div>
        )}
      </div>
    </>
  );
};

const EmptySchedule = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center gap-3 py-4">
      <div className="text-center text-sm text-[color:var(--color-gray-placeholder)] leading-6">
        이날은 일정이 없어요 <br /> 새로운 일정을 만들어 볼까요?
      </div>
      <button
        className="flex text-[color:var(--color-primary-400)] gap-[2px] justify-center items-center cursor-pointer"
        onClick={() => router.push("/meeting")}
      >
        <span className="hover:font-medium text-xs">일정 만들러 가기</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
};

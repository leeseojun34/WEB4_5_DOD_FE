"use client";

import { ArrowRight, EllipsisVertical } from "lucide-react";
import NameTag from "./NameTag";
import Link from "next/link";
import { useState } from "react";
import DropdownSmall from "./DropdownSmall";
import { useDeleteSchedule } from "@/lib/api/scheduleApi";

interface BaseProps {
  variant: "event" | "attendance";
  time: string;
  members: string[];
}

interface EventProps extends BaseProps {
  variant: "event";
  title: string;
  meetingType: "ONLINE" | "OFFLINE";
  scheduleId: string;
}

interface AttendanceProps extends BaseProps {
  variant: "attendance";
  totalCount: number;
}

type ScheduleCardProps = EventProps | AttendanceProps;

const ScheduleCard = (props: ScheduleCardProps) => {
  const { time, members, variant, scheduleId } = props;
  const [isOpen, setIsOpen] = useState(false);
  const deleteSchedule = useDeleteSchedule();

  const onTopClick = () => {};

  const onBottomClick = () => {
    deleteSchedule.mutate(scheduleId);
  };

  return (
    <div
      className="min-w-[335px] max-w-185 w-full h-auto p-4 rounded-lg bg-[color:var(--color-white)]  flex cursor-pointer transition-all duration-100 hover:-translate-y-0.5"
      style={{ boxShadow: "var(--shadow-common)" }}
    >
      <Link
        href={`/schedule/${scheduleId}`}
        className="flex flex-col flex-1 gap-2"
      >
        <div className="flex justify-between">
          <div className="flex gap-3">
            {variant === "event" ? (
              <>
                <p className="text-[color:var(--color-gray)] text-xs">
                  {props.title}
                </p>
                <p className="text-[color:var(--color-primary-400)] text-xs font-regular">
                  {props.meetingType === "OFFLINE" ? "오프라인" : "온라인"}
                </p>
              </>
            ) : (
              <>
                <p className="text-[color:var(--color-gray)] text-xs">
                  {props.totalCount}명 중{" "}
                  <span className="text-[color:var(--color-primary-400)]">
                    {members.length}명
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
        <div className="text-sm font-medium text-[color:var(--color-black)]">
          {time}
        </div>
        <div className="flex gap-1">
          {members.map((member, i) => (
            <NameTag name={member} key={`${member}-${i}`} />
          ))}
        </div>
      </Link>

      {variant === "event" ? (
        <div className="relative">
          <button onClick={() => setIsOpen(true)}>
            <EllipsisVertical className="w-[18px] h-[18px] text-[color:var(--color-black)] cursor-pointer" />
          </button>
          {isOpen && (
            <div className="absolute right-0 top-6">
              <DropdownSmall
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onTopClick={onTopClick}
                onBottomClick={onBottomClick}
              >
                {["링크 복사", "일정 삭제"]}
              </DropdownSmall>
            </div>
          )}
        </div>
      ) : (
        <button onClick={() => console.log("hi")}>
          <ArrowRight className="w-[18px] h-[18px] text-[color:var(--color-black)]" />
        </button>
      )}
    </div>
  );
};

export default ScheduleCard;

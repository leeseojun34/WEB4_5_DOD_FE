"use client";

import { ArrowRight, EllipsisVertical } from "lucide-react";
import NameTag from "./NameTag";
import Link from "next/link";
import { useState } from "react";
import DropdownSmall from "./DropdownSmall";
import { isFutureDate } from "@/app/utils/dateFormat";

interface BaseProps {
  variant: "event" | "attendance";
  time: string;
  members: string[];
}

interface EventProps extends BaseProps {
  variant: "event";
  title: string;
  meetingType: "온라인" | "오프라인";
}

interface AttendanceProps extends BaseProps {
  variant: "attendance";
  totalCount: number;
}

type ScheduleCardProps = EventProps | AttendanceProps;

const ScheduleCard = (props: ScheduleCardProps) => {
  const { time, members, variant } = props;
  const [isOpen, setIsOpen] = useState(false);
  const scheduleId = 1;

  const isFuture = isFutureDate(time);

  return (
    <div
      className={`min-w-[335px] max-w-185 w-full h-auto p-4 rounded-lg ${
        isFuture
          ? "bg-[color:var(--color-white)]"
          : "bg-[color:var(--color-muted)]"
      }  flex cursor-pointer transition-all duration-100 hover:-translate-y-0.5`}
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
                <p
                  className={` ${
                    isFuture
                      ? "text-[color:var(--color-gray)]"
                      : "text-[color:var(--color-gray-placeholder)]"
                  } text-xs`}
                >
                  {props.title}
                </p>
                <p
                  className={` ${
                    isFuture
                      ? "text-[color:var(--color-primary-400)]"
                      : "text-[color:var(--color-gray-placeholder)]"
                  }  text-xs font-regular`}
                >
                  {props.meetingType}
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
        <div
          className={`text-sm font-medium ${
            isFuture
              ? "text-[color:var(--color-black)]"
              : "text-[color:var(--color-gray-placeholder)]"
          } `}
        >
          {time}
        </div>
        <div className="flex gap-1">
          {members.map((member, i) => (
            <NameTag name={member} key={`${member}-${i}`} isFuture={isFuture} />
          ))}
        </div>
      </Link>

      {variant === "event" ? (
        <div className="relative">
          <button onClick={() => setIsOpen(true)}>
            <EllipsisVertical
              className={`w-[18px] h-[18px] ${
                isFuture
                  ? "text-[color:var(--color-black)]"
                  : "text-[color:var(--color-gray-placeholder)]"
              } cursor-pointer`}
            />
          </button>
          {isOpen && (
            <div className="absolute right-0 top-6">
              <DropdownSmall
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onTopClick={() => console.log("click")}
                onBottomClick={() => console.log("click")}
              >
                {["일정 삭제", "링크 복사"]}
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

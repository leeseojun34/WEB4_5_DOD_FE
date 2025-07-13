"use client";

import { ArrowRight, EllipsisVertical } from "lucide-react";
import NameTag from "./NameTag";

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

  return (
    <div
      className="min-w-[335px] max-w-185 w-full h-auto p-4 rounded-lg bg-[color:var(--color-white)]  flex cursor-pointer transition-all duration-100 hover:-translate-y-0.5"
      style={{ boxShadow: "var(--shadow-common)" }}
    >
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex justify-between">
          <div className="flex gap-3">
            {variant === "event" ? (
              <>
                <p className="text-[color:var(--color-gray)] text-xs">
                  {props.title}
                </p>
                <p className="text-[color:var(--color-primary-400)] text-xs font-regular">
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
        <div className="text-sm font-medium text-[color:var(--color-black)]">
          {time}
        </div>
        <div className="flex gap-1">
          {members.map((member, i) => (
            <NameTag name={member} key={`${member}-${i}`} />
          ))}
        </div>
      </div>

      {variant === "event" ? (
        <div>
          <button onClick={() => console.log("hi")}>
            <EllipsisVertical className="w-[18px] h-[18px] text-[color:var(--color-black)]" />
          </button>
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

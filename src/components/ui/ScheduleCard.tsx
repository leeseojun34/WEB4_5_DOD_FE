"use client";

import { ArrowRight, EllipsisVertical } from "lucide-react";
import NameTag from "./NameTag";
import Link from "next/link";
import DropdownSmall from "./DropdownSmall";
import { isFutureDate } from "@/app/utils/dateFormat";
import ControlledAlertBox from "./ControlledAlertBox";
import { useGroupScheduleActions } from "../feature/group/detail/hooks/useGroupDetailLogic";

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
  groupRole: boolean;
  onCustomDelete?: (scheduleMemberId: number) => void;
  scheduleMemberId?: number;
}

interface AttendanceProps extends BaseProps {
  variant: "attendance";
  totalCount: number;
}

type ScheduleCardProps = EventProps | AttendanceProps;

const ScheduleCard = (props: ScheduleCardProps) => {
  const { time, members, variant } = props;
  const {
    isOpen,
    setIsOpen,
    isAlertOpen,
    setIsAlertOpen,
    handleAlertAction,
    handleTopClick,
    handleBottomClick,
  } = useGroupScheduleActions();

  const scheduleId = props.variant === "event" ? props.scheduleId : "";
  const groupRole = props.variant === "event" ? props.groupRole : "";
  const onCustomDelete =
    props.variant === "event" ? props.onCustomDelete : undefined;
  const scheduleMemberId =
    props.variant === "event" ? props.scheduleMemberId : undefined;

  const onTopClick = () => {
    handleTopClick(scheduleId);
  };

  const onBottomClick = () => {
    handleBottomClick();
  };

  const isFuture = isFutureDate(time);

  const handleDelete = () => {
    if (onCustomDelete && scheduleMemberId !== undefined) {
      onCustomDelete(scheduleMemberId);
    } else {
      handleAlertAction(scheduleId);
    }
  };

  return (
    <div
      className={`min-w-[335px] max-w-185 w-full h-auto p-4 rounded-lg ${
        isFuture
          ? "bg-[color:var(--color-white)]"
          : "bg-[color:var(--color-muted)]"
      }  flex cursor-pointer transition-all duration-100 hover:-translate-y-0.5`}
      style={{ boxShadow: "var(--shadow-common)" }}
    >
      {/* event 카드일 때 */}
      {variant === "event" ? (
        <Link
          href={`/schedule/${scheduleId}`}
          className="flex flex-col flex-1 gap-2"
        >
          <div className="flex justify-between">
            <div className="flex gap-3">
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
                {props.meetingType === "OFFLINE" ? "오프라인" : "온라인"}
              </p>
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
              <NameTag
                name={member}
                key={`${member}-${i}`}
                isFuture={isFuture}
              />
            ))}
          </div>
        </Link>
      ) : (
        <div className="flex flex-col flex-1 gap-2">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <p className="text-[color:var(--color-gray)] text-xs">
                {props.totalCount}명 중{" "}
                <span className="text-[color:var(--color-primary-400)]">
                  {members.length}명
                </span>
              </p>
            </div>
          </div>
          <div className="text-sm font-medium text-[color:var(--color-black)]">
            {time}
          </div>
          <div className="flex gap-1">
            {members.map((member, i) => (
              <NameTag name={member} key={`${member}-${i}`} isFuture={true} />
            ))}
          </div>
        </div>
      )}

      {variant === "event" && groupRole && (
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
                onTopClick={onTopClick}
                onBottomClick={onBottomClick}
              >
                {["링크 복사", "일정 삭제"]}
              </DropdownSmall>
            </div>
          )}
        </div>
      )}
      {variant === "attendance" && (
        <button onClick={() => console.log("hi")}>
          <ArrowRight className="w-[18px] h-[18px] text-[color:var(--color-black)]" />
        </button>
      )}

      <ControlledAlertBox
        content={"정말 삭제하시겠습니까?"}
        cancel="취소"
        action="확인"
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        actionHandler={handleDelete}
      />
    </div>
  );
};

export default ScheduleCard;

import { ChevronLeft, Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DropdownSmall from "../ui/DropdownSmall";
import { useLeaveGroup } from "@/lib/api/groupApi";

interface GroupHeaderTopProps {
  name: string;
  id: string;
  isLeader: boolean;
  type: "schedule" | "group";
}

const GroupHeaderTop = ({ name, id, isLeader, type }: GroupHeaderTopProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const fontStyleWhite = "text-lg text-[color:var(--color-white)]";
  const router = useRouter();
  const leaveGroup = useLeaveGroup();

  const handleBack = () => {
    router.back();
  };

  const clickEllipsisHandler = () => {
    setIsOpen(true);
  };

  const onTopClick = () => {
    if (!isLeader) {
      if (type === "group") {
        leaveGroup.mutate(id);
      } else {
      }
    } else {
      if (type === "group") {
        router.push(`/schedule/${id}/edit/detail`);
      } else {
        router.push(`/schedule/${id}/edit/detail`);
      }
    }
  };

  const onBottomClick = () => {
    if (type === "group") {
      leaveGroup.mutate(id);
    } else {
    }
  };
  return (
    <div className="w-full flex justify-between items-center">
      <span onClick={handleBack} className="cursor-pointer">
        <ChevronLeft color={"var(--color-white)"} size={20} />
      </span>
      <span className={fontStyleWhite}>{name}</span>

      <span
        onClick={clickEllipsisHandler}
        className={`cursor-pointer relative ${
          type === "schedule" && !isLeader ? "invisible" : ""
        }`}
      >
        <Ellipsis color={"var(--color-white)"} size={16} />
        {isOpen &&
          (isLeader ? (
            <div className="absolute top-full right-0 z-50 min-w-27 w-auto">
              <DropdownSmall
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onTopClick={onTopClick}
                onBottomClick={onBottomClick}
              >
                {type === "group"
                  ? ["그룹 정보수정", "그룹 나가기"]
                  : ["모임 정보수정"]}
              </DropdownSmall>
            </div>
          ) : (
            <div className="absolute top-full right-0 z-50 min-w-27 w-auto">
              <DropdownSmall
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onTopClick={onTopClick}
              >
                {["그룹 나가기"]}
              </DropdownSmall>
            </div>
          ))}
      </span>
    </div>
  );
};

export default GroupHeaderTop;

import { ChevronLeft, Ellipsis, SquarePen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DropdownSmall from "../ui/DropdownSmall";

interface GroupHeaderTopProps {
  groupName: string;
  groupId: string;
  isLeader: boolean;
}

const GroupHeaderTop = ({
  groupName,
  groupId,
  isLeader,
}: GroupHeaderTopProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const fontStyleWhite = "text-lg text-[color:var(--color-white)]";
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const clickEllipsisHandler = () => {
    setIsOpen(true);
  };

  const onTopClick = () => {
    router.push(`/schedule/${groupId}/edit/detail`);
  };
  return (
    <div className="w-full flex justify-between items-center">
      <span onClick={handleBack} className="cursor-pointer">
        <ChevronLeft color={"var(--color-white)"} size={20} />
      </span>
      <span className={fontStyleWhite}>{groupName}</span>

      <span onClick={clickEllipsisHandler} className="cursor-pointer relative">
        <Ellipsis color={"var(--color-white)"} size={16} />
        {isOpen &&
          (isLeader ? (
            <div className="absolute top-full right-0 z-50 min-w-27 w-auto">
              <DropdownSmall
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onTopClick={onTopClick}
                onBottomClick={() => console.log("bottomclick")}
              >
                {["그룹 정보수정", "그룹 나가기"]}
              </DropdownSmall>
            </div>
          ) : (
            <DropdownSmall />
          ))}
      </span>
    </div>
  );
};

export default GroupHeaderTop;

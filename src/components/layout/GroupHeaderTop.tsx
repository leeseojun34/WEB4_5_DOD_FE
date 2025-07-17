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
  return (
    <div className="w-full flex justify-between items-center">
      <span onClick={handleBack} className="cursor-pointer">
        <ChevronLeft color={"var(--color-white)"} size={20} />
      </span>
      <span className={fontStyleWhite}>{groupName}</span>

      <span onClick={clickEllipsisHandler} className="cursor-pointer">
        <Ellipsis color={"var(--color-white)"} size={16} />
      </span>
    </div>
  );
};

export default GroupHeaderTop;

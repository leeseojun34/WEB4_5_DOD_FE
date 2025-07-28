import { BiUser } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { Ellipsis } from "lucide-react";
import DropdownSmall from "../ui/DropdownSmall";
import { useState } from "react";

type GroupHeaderProps = {
  name: string;
  description: string;
  count: number;
  isLeader: boolean;
  id?: string;
};

const GroupHeaderMap = ({
  name,
  description,
  count,
  isLeader,
  id = "0",
}: GroupHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const clickEllipsisHandler = () => {
    setIsOpen(true);
  };

  const onTopClick = () => {
    if (isLeader) {
      router.push(`/schedule/${id}/edit/detail`);
    } else {
    }
  };

  return (
    <>
      <div className="w-full bg-[color:var(--color-white)] flex justify-center items-center min-w-[375px]">
        <div className="flex flex-col w-full max-w-[740px]  items-center justify-center gap-4 pb-5 pt-8 sm:pt-10 px-5">
          <div className="w-full flex justify-between items-center">
            <div className="size-4"></div>
            <span className="text-lg">{name}</span>
            <span
              onClick={clickEllipsisHandler}
              className={`cursor-pointer relative ${
                isLeader ? "" : "invisible"
              }`}
            >
              <Ellipsis size={16} />
              {isOpen &&
                (isLeader ? (
                  <div className="absolute top-full right-0 z-50 min-w-27 w-auto">
                    <DropdownSmall
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                      onTopClick={onTopClick}
                    >
                      {["정보 수정"]}
                    </DropdownSmall>
                  </div>
                ) : (
                  <div className="absolute top-full right-0 z-50 min-w-27 w-auto">
                    <DropdownSmall
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                      onTopClick={onTopClick}
                    >
                      {["일정 편집"]}
                    </DropdownSmall>
                  </div>
                ))}
            </span>
          </div>

          <p className="text-sm font-normal text-[color:var(--color-gray)]">
            {description}
          </p>
          <div className="flex items-center justify-center gap-1 rounded-sm pl-2 pr-0.5 py-0.5 text-xs bg-[color:var(--color-gray-background)] text-[color:var(--color-gray)]">
            <BiUser size={14} />
            {/* 인원수 */}
            <span className="pr-1.5">{count}</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default GroupHeaderMap;

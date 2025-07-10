import { EllipsisVertical } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface GroupMemberItemProps {
  isLeader?: boolean;
  character: StaticImageData;
  name: string;
}

const GroupMemberItem = ({
  isLeader = false,
  character,
  name,
}: GroupMemberItemProps) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-3 items-center">
        <Image src={character} alt="유저 캐릭터" className="w-6 h-7" />
        <div className="text-sm font-medium text-[color:var(--color-black)]">
          {name}
        </div>
      </div>
      {isLeader && (
        <button className="cursor-pointer">
          <EllipsisVertical className="w-[18px] h-[18px] text-[color:var(--color-gray)]" />
        </button>
      )}
    </div>
  );
};

export default GroupMemberItem;

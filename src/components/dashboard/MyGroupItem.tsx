// import UserIcon from "@/assets/icon/user_icon.svg";
import { BiUser } from "react-icons/bi";
import Image from "next/image";
import { DashboardGroupType } from "@/lib/api/dashboardApi";
import { profileImages } from "@/lib/profileImages";

interface MyGroupItemProps {
  group: DashboardGroupType;
}

export const MyGroupItem = ({ group }: MyGroupItemProps) => {
  const groupProfileImg = profileImages[group.leaderProfileImage];
  return (
    <>
      <div className="flex gap-5 items-center min-w-50 max-w-185 py-2 pr-2 rounded-md hover:bg-[color:var(--color-gray-background)] hover:shadow-sm transition-all duration-200 ease-in-out">
        <div className="flex items-center justify-center min-w-[72px] h-[50px] bg-[color:var(--color-gray-background)] rounded-lg">
          <Image
            src={groupProfileImg}
            alt="캐릭터 이미지"
            className="w-[32px] h-[34px]"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center gap-1 w-full min-w-0">
          <div className="flex items-center justify-between w-full min-w-0">
            <div className="text-[color:var(--color-black)] text-sm font-semibold w-[130px] sm:w-[380px] truncate">
              {group.groupName}
            </div>
            <div className="flex gap-1 items-center">
              <BiUser className="text-[color:var(--color-gray-placeholder)] w-[12px] h-[12px]" />
              <span className="text-[color:var(--color-gray-placeholder)] text-[12px] pt-[0.5px]">
                {group.groupMemberNum}
              </span>
            </div>
          </div>
          <p className="text-xs font-regular text-[color:var(--color-gray-placeholder)] w-full sm:w-[380px] truncate whitespace-nowrap overflow-hidden">
            {group.description}
          </p>
        </div>
      </div>
    </>
  );
};

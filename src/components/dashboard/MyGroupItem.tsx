import character1 from "@/assets/images/profile_pastel_black.png";
// import UserIcon from "@/assets/icon/user_icon.svg";
import { BiUser } from "react-icons/bi";
import Image from "next/image";

export const MyGroupItem = () => {
  return (
    <>
      <div className="flex gap-5 items-center min-w-50 max-w-185">
        <div className="flex items-center justify-center min-w-[72px] h-[50px] bg-[color:var(--color-gray-background)] rounded-lg">
          <Image
            src={character1}
            alt="캐릭터 이미지"
            className="w-[34px] h-[34px]"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center gap-1 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="text-[color:var(--color-black)] text-sm font-semibold w-[130px] sm:w-[380px] truncate">
              {/* 그룹 이름 */}
              사이버 카츠오모이
            </div>
            <div className="flex gap-1">
              <BiUser className="text-[color:var(--color-gray-placeholder)] w-[10px] h-[10px]" />
              <span className="text-[color:var(--color-gray-placeholder)] text-[8px] font-semibold">
                {/* 그룹원 수 */}
                60
              </span>
            </div>
          </div>
          <p className="text-xs font-regular text-[color:var(--color-gray-placeholder)] w-[150px] sm:w-[380px] truncate ">
            {/* 그룹 설명 */}
            안녕하세요 박준규 팬미팅 모임입니다람쥐.
          </p>
        </div>
      </div>
    </>
  );
};

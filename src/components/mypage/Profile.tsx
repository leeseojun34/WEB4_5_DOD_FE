import Image from "next/image";
import profile from "@/assets/images/profile_pastel_blue.png";
import { Pen } from "lucide-react";

const Profile = ({ editHandler }: { editHandler: () => void }) => {
  return (
    <div className="w-full flex flex-col justify-between items-center gap-4">
      <div className="flex relative w-[76px] h-[84px]">
        <Image src={profile} alt="사용자 프로필 이미지" fill />
      </div>
      <div className="w-full flex flex-col justify-between items-center ">
        <div className="flex justify-between items-center gap-1.5">
          <span className="text-sm font-medium text-[color:var(--color-black)]">
            블랙 토끼수
          </span>
          <span onClick={editHandler}>
            <Pen
              size={12}
              className="text-[var(--color-gray)] hover:text-[var(--color-primary-400)] cursor-pointer"
            />
          </span>
        </div>
        <div className="text-xs font-normal text-[color:var(--color-gray-placeholder)]">
          sucoding@gmail.com
        </div>
      </div>
    </div>
  );
};
export default Profile;

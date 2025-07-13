"use client";
import Image from "next/image";
import LogoWebHeader from "../ui/LogoWebHeader";
import profile from "@/assets/images/profile_pastel_orange.png";
import calendarBlue from "@/assets/images/calendar_blue.png";
import calendarWhite from "@/assets/images/calendar_white.png";
import { useRouter } from "next/navigation";

// 로그인 인증 추가해야함
const Header = ({ type = "" }: { type?: "" | "blue" }) => {
  const router = useRouter();

  return (
    <div
      className={`w-full flex justify-between items-center px-20 py-6 ${
        type === "blue"
          ? "bg-[color:var(--color-primary-400)]"
          : "bg-transparent"
      }`}>
      <LogoWebHeader type={type} handleLogoClick={() => router.push("/")} />
      <div className="flex justify-between items-center gap-8">
        {/* 로그인 했을 때 */}
        <div className="flex justify-between items-center gap-8">
          <Image
            src={type === "blue" ? calendarWhite : calendarBlue}
            alt="달력"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={() => router.push("/schedule/create")}
          />
          <Image
            src={profile}
            alt="프로필이미지"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={() => router.push("/mypage")}
          />
        </div>
        {/* 비로그인 */}
        <button
          onClick={() => router.push("/login")}
          className={`flex items-center px-4 py-2 rounded-[50px] border border-x 
            ${
              type === "blue"
                ? "border-[color:var(--color-white)] text-[color:var(--color-white)] hover:bg-[color:var(--color-white)] hover:text-[color:var(--color-primary-400)]"
                : "border-[color:var(--color-primary-400)] text-[color:var(--color-primary-400)] hover:bg-[color:var(--color-primary-400)] hover:text-[color:var(--color-white)]"
            } text-xs font-medium cursor-pointer `}>
          로그인
        </button>
      </div>
    </div>
  );
};
export default Header;

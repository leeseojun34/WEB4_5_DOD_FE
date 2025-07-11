import Image from "next/image";
import LogoWebHeader from "../ui/LogoWebHeader";
import profile from "@/assets/images/profile_pastel_orange.png";
import calendarBlue from "@/assets/images/calendar_blue.png";
import calendarWhite from "@/assets/images/calendar_white.png";

const Header = ({ type = "white" }: { type: "white" }) => {
  return (
    <div
      className={`w-full flex justify-between items-center px-20 py-6 ${
        type === "white"
          ? "bg-[color:var(--color-white)]"
          : "bg-[color:var(--color-primary-400)]"
      }`}>
      <LogoWebHeader type={type} />
      <div className="flex justify-between items-center gap-8">
        <Image
          src={type === "white" ? calendarBlue : calendarWhite}
          alt="달력"
          width={24}
          height={24}
        />
        <Image src={profile} alt="프로필이미지" width={20} height={20} />
      </div>
    </div>
  );
};
export default Header;

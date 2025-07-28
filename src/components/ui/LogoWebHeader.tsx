import Image from "next/image";
import blue from "@/assets/images/profile_blue.png";

function LogoWebHeader({
  type = "",
  handleLogoClick,
}: {
  type: "" | "blue" | "blur";
  handleLogoClick: () => void;
}) {
  return (
    <div
      onClick={handleLogoClick}
      className={`flex justify-center items-center font-[TTTogether] text-xs font-normal ${
        type === "blue"
          ? "text-[color:var(--color-white)]"
          : "text-[color:var(--color-primary-400)]"
      } gap-1 cursor-pointer`}>
      <span>이때</span>
      <Image src={blue} alt="파란토끼" width={20} height={20} />
      <span>어때</span>
    </div>
  );
}
export default LogoWebHeader;

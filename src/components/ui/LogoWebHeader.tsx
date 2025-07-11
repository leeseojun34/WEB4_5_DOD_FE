import Image from "next/image";
import blue from "@/assets/images/profile_blue.png";

function LogoWebHeader({ type }: { type: string }) {
  return (
    <div
      className={`flex justify-center items-center font-[TTTogether] text-xs font-normal ${
        type === "white"
          ? `text-[color:var(--color-black)]`
          : `text-[color:var(--color-white)]`
      } gap-1`}>
      <span>이때</span>
      <Image src={blue} alt="파란토끼" width={20} height={20} />
      <span>어때</span>
    </div>
  );
}
export default LogoWebHeader;

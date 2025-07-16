import Image from "next/image";
import rabbit from "@/assets/images/logo_half_rabbit.png";

const MainLogo = () => {
  return (
    <div className="relative z-20 font-[TTTogether] text-[170px] sm:text-[200px] md:text-[250px] text-[color:var(--color-primary-400)] ">
      <Image
        className="absolute right-1 sm:right-2 md:right-4 -top-20 sm:-top-22 md:-top-24 w-40 sm:w-45 md:w-50 z-0"
        src={rabbit}
        alt="로고 토끼"
        priority
      />
      <p className="relative leading-none ">이때</p>
      <p className="relative leading-none ">어때</p>
    </div>
  );
};
export default MainLogo;

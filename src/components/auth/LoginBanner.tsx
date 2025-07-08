import Image from "next/image";
import character from "@/assets/images/Home_login.png";

const LoginBanner = () => {
  return (
    <div className="relative w-full h-[60%] bg-[color:var(--color-primary-400)] text-[color:var(--color-primary-200)] font-[TTTogether] text-6xl sm:text-7xl ">
      <p className="pl-10 lg:pl-30 pt-15 ">
        <span className="text-[color:var(--color-white)]">말한마디</span>로
        <br />
        시작하는 <br />
        <span className="text-[color:var(--color-white)]">완벽한</span>모임
      </p>

      <div className="absolute bottom-0 right-0 size-[300px] md:size-[350px] lg:size-[400px]">
        <Image src={character} alt="" className="w-full" />
      </div>
    </div>
  );
};
export default LoginBanner;

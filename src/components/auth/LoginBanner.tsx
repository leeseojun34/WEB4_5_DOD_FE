import Image from "next/image";
import character from "@/assets/images/Home_login.png";

const LoginBanner = () => {
  return (
    <div className="relative w-full h-[60%] bg-[color:var(--color-primary-400)] text-[color:var(--color-primary-200)] font-[TTTogether] text-4xl ">
      <p className="px-5 pt-10">
        <span className="text-[color:var(--color-white)]">말한마디</span>로
        <br />
        시작하는 <br />
        <span className="text-[color:var(--color-white)]">완벽한</span>모임
      </p>

      <div className="absolute bottom-0 right-0">
        <Image width={300} height={300} src={character} alt="" />
      </div>
    </div>
  );
};
export default LoginBanner;

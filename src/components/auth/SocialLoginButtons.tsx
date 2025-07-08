import Image from "next/image";
import kakao from "@/assets/icon/kakao_login_icon.svg";
import google from "@/assets/icon/google_login_icon.svg";

const SocialLoginButtons = () => {
  return (
    <div className="relative flex-1 flex flex-col justify-center w-full items-center gap-4 px-5 text-sm">
      <span className="absolute top-0 right-0 text-6xl sm:text-7xl md:text-8xl font-[TTTogether] text-[color:var(--color-primary-400)] leading-10 md:leading-15">
        이때, 어때?
      </span>
      <button
        className=" w-full bg-[color:var(--color-white)] h-11 rounded-sm flex justify-center items-center gap-2 font-semibold  cursor-pointer max-w-[700px] "
        style={{ boxShadow: "var(--shadow-common)" }}
      >
        <Image width={18} height={18} src={google} alt="" />
        구글 로그인
      </button>
      <button className=" w-full bg-[#FEE500] h-11 rounded-sm flex justify-center items-center gap-2 font-semibold cursor-pointer max-w-[700px]">
        <Image width={18} height={18} src={kakao} alt="" />
        카카오 로그인
      </button>
    </div>
  );
};
export default SocialLoginButtons;

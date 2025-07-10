import Image from "next/image";
import kakao from "@/assets/icon/kakao_login_icon.svg";

const KakaoLoginButton = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/oauth2/authorization/kakao`;
  };
  return (
    <button
      className=" w-full bg-[#FEE500] h-11 rounded-sm flex justify-center items-center gap-2 font-semibold cursor-pointer max-w-[700px]"
      onClick={handleLogin}
    >
      <Image width={18} height={18} src={kakao} alt="" />
      카카오 로그인
    </button>
  );
};
export default KakaoLoginButton;

import Image from "next/image";
import google from "@/assets/icon/google_login_icon.svg";

const GoogleLoginButton = () => {
  const handleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}
		&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_AUTH_REDIRECT_URI}
		&response_type=code
		&scope=email profile`;
  };
  return (
    <button
      className=" w-full bg-[color:var(--color-white)] h-11 rounded-sm flex justify-center items-center gap-2 font-semibold  cursor-pointer max-w-[700px] "
      style={{ boxShadow: "var(--shadow-common)" }}
      onClick={handleLogin}
    >
      <Image width={18} height={18} src={google} alt="" />
      구글 로그인
    </button>
  );
};
export default GoogleLoginButton;

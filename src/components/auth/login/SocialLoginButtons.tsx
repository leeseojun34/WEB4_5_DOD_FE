"use client";

import GoogleLoginButton from "./GoogleLoginButton";
import KakaoLoginButton from "./KakaoLoginButton";

const SocialLoginButtons = () => {
  return (
    <div className="relative flex-1 flex flex-col justify-center w-full items-center gap-4 px-5 text-sm">
      <span className="absolute top-0 right-0 text-6xl sm:text-7xl md:text-8xl font-[TTTogether] text-[color:var(--color-primary-400)] leading-10 md:leading-15">
        이때, 어때?
      </span>
      <GoogleLoginButton />
      <KakaoLoginButton />
    </div>
  );
};
export default SocialLoginButtons;

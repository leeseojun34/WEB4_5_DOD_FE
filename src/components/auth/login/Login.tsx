"use client";

import LoginBanner from "./LoginBanner";
import SocialLoginButtons from "./SocialLoginButtons";
import useAuthStore from "@/stores/authStores";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (user && isMounted) {
      router.push("/");
    }
  }, [user, isMounted]);

  // SSR에서 Null 처리
  if (!isMounted) return null;
  // CSR, 로그인 된 유저는 null 처리
  if (user) return null;

  return (
    <div className="h-screen flex flex-col">
      <LoginBanner />
      <SocialLoginButtons />
    </div>
  );
};
export default Login;

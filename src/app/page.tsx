"use client";

import { useEffect, useState } from "react";
import Dashboard from "@/components/dashboard/dashboard";
import Landing from "@/components/landing/Landing";

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // 로그인 유무에 따라 페이지 분기
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return <>{isLogin ? <Dashboard /> : <Landing />}</>;
};
export default Home;

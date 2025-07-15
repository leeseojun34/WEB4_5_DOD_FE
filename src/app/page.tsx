"use client";

import { useEffect, useState } from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import Landing from "@/components/landing/Landing";
import { useUser } from "@/lib/api/userApi";

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { isSuccess, isError } = useUser();

  useEffect(() => {
    if (isSuccess) {
      setIsLogin(true);
    } else if (isError) {
      setIsLogin(false);
    }
  }, [isSuccess, isError]);

  return <>{isLogin ? <Dashboard /> : <Landing />}</>;
};
export default Home;

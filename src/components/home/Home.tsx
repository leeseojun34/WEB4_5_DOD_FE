"use client";

import GlobalLoading from "@/app/loading";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import Dashboard from "@/components/dashboard/Dashboard";
import Landing from "@/components/landing/Landing";

const Home = () => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const { isSuccess, isError } = useUser();

  useEffect(() => {
    if (isSuccess) setIsLogin(true);
    else if (isError) setIsLogin(false);
  }, [isSuccess, isError]);

  if (isLogin === null) {
    return <GlobalLoading />;
  }

  return <>{isLogin ? <Dashboard /> : <Landing />}</>;
};

export default Home;

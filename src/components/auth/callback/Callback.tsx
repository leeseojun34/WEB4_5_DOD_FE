"use client";

import GlobalLoading from "@/app/loading";
import { useUser } from "@/lib/api/userApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Callback = () => {
  const router = useRouter();
  const { isSuccess, isError, refetch } = useUser();

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (isSuccess) {
      const url = localStorage.getItem("redirect");
      if (url) {
        router.push(url);
        localStorage.removeItem("redirect");
      } else {
        router.push("/");
      }
    } else if (isError) {
      console.error("No User");
      router.push("/auth/login");
    }
  }, [isSuccess, isError, router]);

  return <GlobalLoading />;
};

export default Callback;

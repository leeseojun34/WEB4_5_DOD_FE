"use client";
import Toast from "@/components/ui/Toast";
import useAuthStore from "@/stores/authStores";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuthRequired = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      if (user) {
        setIsAuthenticated(true);
        setIsLoading(false);
      } else if (!user && isMounted) {
        setIsAuthenticated(false);
        Toast("로그인 후 이용해주세요.");
        router.replace("/auth/login");
      }
    };
    checkAuth();
  }, [user, router, isMounted]);

  return {
    isAuthenticated,
    isLoading,
    user,
  };
};

export default useAuthRequired;

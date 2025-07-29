"use client";
import useAuthStore from "@/stores/authStores";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuthRequired = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      if (user) {
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        setIsAuthenticated(false);
        router.replace("/auth/login");
      }
    };
    checkAuth();
  }, [user, router]);

  return {
    isAuthenticated,
    isLoading,
    user,
  };
};

export default useAuthRequired;

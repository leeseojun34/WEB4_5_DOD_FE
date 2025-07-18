import { axiosInstance } from "@/lib/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@/sotres/authStores";
import { useEffect } from "react";

const getUserInfo = async () => {
  const res = await axiosInstance.get("/member/me");
  return res.data;
};

export const useUser = () => {
  const { setUser } = useAuthStore();

  const query = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data.data);
    }
  }, [query.data, setUser]);

  return query;
};

export const logout = async () => {
  return await axiosInstance.post("/auth/logout");
};

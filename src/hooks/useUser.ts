import { axiosInstance } from "@/lib/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getUserInfo = async () => {
  const res = await axiosInstance.get("/member/me", {
    withCredentials: true,
  });
  return res.data;
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const logout = async () => {
  return await axiosInstance.post("/auth/logout");
};

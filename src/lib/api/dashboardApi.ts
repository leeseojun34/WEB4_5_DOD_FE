import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

/**
 * 회원의 그룹리스트, 일정, 캘린더 조회
 * @param date 날짜(2025-07-12)
 * @returns
 */

export const getDashboardDetail = async (date: string) => {
  const response = await axiosInstance.get(`/main-page`, { params: { date } });
  return response.data;
};

export const useDashboard = (date: string) => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboardDetail(date),
    enabled: !!date,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

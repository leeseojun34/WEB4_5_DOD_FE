import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";
import { formatDate } from "@/app/utils/dateFormat";

export interface DashboardScheduleType {
  id: number;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  isGrouped: boolean;
  groupName: string;
  specificLocation: string;
  meetingType: string;
  meetingPlatform: string;
  scheduleStatus: string;
  source: string;
  participantNames: string;
}

export interface DashboardGroupType {
  groupId: number;
  groupName: string;
  description: string;
  groupMemberNum: number;
  leaderProfileImage: number;
}

export interface DashboardDetailResponse {
  schedules: DashboardScheduleType[];
  groups: {
    groupDetails: DashboardGroupType[];
  };
}

export interface UserScheduleResponse {
  [date: string]: DashboardScheduleType[];
}

/**
 * 회원의 그룹리스트, 일정, 캘린더 조회
 * @param date 날짜(2025-07-12)
 * @returns
 */
export const getDashboardDetail = async (date: string) => {
  const response = await axiosInstance.get(`/main-page`, { params: { date } });
  return response.data;
};

export const useDashboardSchedules = (selectedDate: Date) => {
  return useQuery({
    queryKey: ["dashboard", "schedules", formatDate(selectedDate)],
    queryFn: () => getDashboardDetail(formatDate(selectedDate)),
    select: (data) => data.data.schedules,
  });
};

export const useDashboardGroups = () => {
  return useQuery({
    queryKey: ["dashboard", "groups"],
    queryFn: () => getDashboardDetail(formatDate(new Date())),
    select: (data) => data.data.groups.groupDetails,
    staleTime: Infinity,
  });
};

/**
 * 회원의 모든 일정 조회
 * @param startDate 날짜(2025-07-12)
 * @param endDate 날짜(2025-07-12)
 * @returns
 */
export const getUserSchedules = async (startDate: string, endDate: string) => {
  const response = await axiosInstance.get(`/main-page/calendar`, {
    params: { startDate, endDate },
  });
  return response.data;
};

export const useUserSchedulse = () => {
  return useQuery({
    queryKey: ["userSchedules"],
    queryFn: () => getUserSchedules("2025-07-01", "2026-07-01"),
    select: (data) => data.data,
  });
};

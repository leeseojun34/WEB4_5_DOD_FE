import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";
import { formatDate, getMonthRange } from "@/app/utils/dateFormat";

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
  activated: boolean;
  scheduleMemberId: number;
}

export interface DashboardGroupType {
  groupId: number;
  groupName: string;
  description: string;
  groupMemberNum: number;
  leaderProfileImage: number;
}

export interface DashboardDetailResponse {
  groupDetails: DashboardGroupType[];
  googleCalendarFetchSuccess: boolean;
  groupedSchedules: {
    [date: string]: DashboardScheduleType[];
  };
}

export interface UserScheduleResponse {
  [date: string]: DashboardScheduleType[];
}

/**
 * 회원의 그룹리스트, 한달 일정 조회
 * @param startDate 날짜(2025-07-12)
 * @param endDate 날짜(2025-08-12)
 * @returns
 */
export const getDashboardDetail = async (
  startDate: string,
  endDate: string
) => {
  const response = await axiosInstance.get(`/main-page/calendar`, {
    params: { startDate, endDate },
  });
  return response.data;
};

/**
 * 월 단위로 스케줄을 가져오고 선택된 날짜 스케줄만 반환
 */
export const useDashboardSchedules = (selectedDate: Date) => {
  const { startDate, endDate, monthKey } = getMonthRange(selectedDate);

  return useQuery({
    queryKey: ["dashboard", "schedules", monthKey],
    queryFn: () => getDashboardDetail(startDate, endDate),
    select: (data) => {
      const groupedSchedules = data.data.groupedSchedules;
      const selectedDateString = formatDate(selectedDate);

      return groupedSchedules[selectedDateString] || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * 월 전체 스케줄
 */
export const useMonthlySchedule = (selectedDate: Date) => {
  const { startDate, endDate, monthKey } = getMonthRange(selectedDate);

  return useQuery({
    queryKey: ["dashboard", "schedules", monthKey],
    queryFn: () => getDashboardDetail(startDate, endDate),
    select: (data) => data.data.groupedSchedules,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useDashboardGroups = () => {
  const { startDate, endDate } = getMonthRange(new Date());
  return useQuery({
    queryKey: ["dashboard", "groups"],
    queryFn: () => getDashboardDetail(startDate, endDate),
    select: (data) => data.data.groupDetails,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * 회원의 모든 일정 조회
 * @param startDate 날짜(2025-07-12)
 * @param endDate 날짜(2026-07-12)
 * @returns
 */
export const getUserSchedules = async (startDate: string, endDate: string) => {
  const response = await axiosInstance.get(`/main-page/schedules`, {
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

export const deactivatedSchedule = async (scheduleMemberId: number) => {
  const response = await axiosInstance.patch(
    `/main-page/schedule-members/${scheduleMemberId}/activation`
  );
  return response.data;
};

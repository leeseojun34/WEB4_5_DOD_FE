import { axiosInstance } from "./axiosInstance";

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

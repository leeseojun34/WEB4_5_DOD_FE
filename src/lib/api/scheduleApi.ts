import { axiosInstance } from "./axiosInstance";

/**
 * 이벤트 등록
 * @param schedule 이벤트 정보
 * @returns
 */
export const createSchedule = async (schedule: ScheduleType) => {
  const response = await axiosInstance.post("/events", schedule);
  return response.data;
};

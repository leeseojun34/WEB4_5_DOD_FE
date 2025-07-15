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

/**
 * 이벤트 상세 조회
 * @param eventId 이벤트 ID
 * @returns
 */
export const getEventDetail = async (eventId: number) => {
  const response = await axiosInstance.get(`/events/${eventId}`);
  return response.data;
};

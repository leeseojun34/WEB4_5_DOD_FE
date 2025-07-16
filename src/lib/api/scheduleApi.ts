import { axiosInstance } from "./axiosInstance";

/**
 * 이벤트 등록
 * @param schedule 이벤트 정보
 * @returns
 */
export const createEvent = async (schedule: EventType) => {
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

/**
 * 참여자 전원 이벤트 시간표 정보 조회
 * @param eventId 이벤트 ID
 * @returns
 */
export const getEventScheduleInfo = async (
  eventId: number
): Promise<EventScheduleInfoType> => {
  const response = await axiosInstance.get(`/events/${eventId}/all-time`);
  return response.data.data;
};

/**
 * 개인의 가능한 시간대 생성/수정
 * @param eventId 이벤트 ID
 * @param time 개인의 가능한 시간대
 * @returns
 */
export const setEventMyTime = async (
  eventId: number,
  time: EventMyTimeType
) => {
  const response = await axiosInstance.post(`/events/${eventId}/my-time`, time);
  return response.data;
};

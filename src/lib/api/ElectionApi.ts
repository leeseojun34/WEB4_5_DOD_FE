import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

export interface CreateDepartLocationRequest {
  //memberId: string;
  departLocationName: string;
  latitude: number;
  longitude: number;
}

export interface VoteMember {
  memberId: string;
}

/*
 * 중간 장소 후보 조회
 * @param scheduleId 스케줄 ID, data(유저id, 출발지역 이름, 위도, 경도)
 * @returns
 */
export const getSuggestedLocations = async (scheduleId: string) => {
  const res = await axiosInstance.get(
    `/schedules/show-suggested-locations/${scheduleId}`
  );
  return res.data;
};

/**
 * 출발 장소 등록
 * @param scheduleId 스케줄 ID, data(유저id, 출발지역 이름, 위도, 경도)
 * @returns
 */
export const createDepartLocation = async (
  scheduleId: string,
  data: CreateDepartLocationRequest
) => {
  const res = await axiosInstance.post(
    `/schedules/create-depart-location/${scheduleId}`,
    data,
    {
      params: {
        scheduleId,
      },
    }
  );
  console.log("출발 장소 response:", res.data);
  return res.data;
};

/**
 * 중간 장소 투표
 * @param scheduleMemberId 투표한 멤버 ID, 위치정보(위도, 경도)
 * @returns
 */
export const voteMiddleLocation = async (
  scheduleMemberId: number,
  body: { locationId: number; scheduleId: number }
) => {
  console.log("투표 body:", body);
  const res = await axiosInstance.post(
    `/schedules/suggested-locations/vote/${scheduleMemberId}`,
    body
  );
  return res.data;
};

//투표한 인원의 아이디 확인
export const getVoteMember = async (scheduleId: string) => {
  const res = await axiosInstance.get(
    `/schedules/show-vote-members/${scheduleId}`
  );
  return res.data.data;
};

export const useVoteMembers = (scheduleId: string) => {
  return useQuery({
    queryKey: ["voteMembers", scheduleId],
    queryFn: () => getVoteMember(scheduleId),
    enabled: !!scheduleId,
    select: (data) => data.voteMembersList || [],
  });
};

//출발 장소 틍록
export const useCreateDepartLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      scheduleId,
      location,
    }: {
      scheduleId: string;
      location: CreateDepartLocationRequest;
    }) => createDepartLocation(scheduleId, location),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduleDetail"] });
    },
    onError: (error) => {
      console.error("출발 장소 등록 실패", error);
    },
  });
};

//중간 장소 조회
export const useSuggestedLocations = (scheduleId: string) => {
  return useQuery({
    queryKey: ["suggestedLocations", scheduleId],
    queryFn: () => getSuggestedLocations(scheduleId),
    enabled: !!scheduleId,
  });
};

//중간 장소 투표
export const useVoteDepartLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      scheduleMemberId,
      locationId,
      scheduleId,
    }: {
      scheduleMemberId: number;
      locationId: number;
      scheduleId: number;
    }) => voteMiddleLocation(scheduleMemberId, { locationId, scheduleId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suggestedLocations"] });
    },
    onError: (error) => {
      console.error("투표 실패", error);
    },
  });
};

//즐겨찾기 장소 조회
export const getFavoriteLocation = async () => {
  const res = await axiosInstance.get("/favorite-location");
  return res.data;
};

export const useFavoriteLocation = () => {
  return useQuery({
    queryKey: ["favoriteLocation"],
    queryFn: getFavoriteLocation,
    enabled: false,
  });
};

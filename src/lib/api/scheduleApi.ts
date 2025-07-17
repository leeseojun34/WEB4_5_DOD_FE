import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";
import { ScheduleType, WorkspacePlatformType } from "@/types/schedule";

interface CreateWorkSpaceRequest {
  workspace: WorkspacePlatformType;
  workspaceName: string;
  url: string;
}

const getGroupSchedule = async (scheduleId: string) => {
  const res = await axiosInstance.get(`/schedules/show/${scheduleId}`, {
    params: { id: scheduleId },
  });
  return res.data;
};

const createWorkspace = async (id: string, data: CreateWorkSpaceRequest) => {
  const res = await axiosInstance.post(`/schedules/add-workspace/${id}`, data);
  return res.data;
};

const deleteWorkspace = async (id: string, workspaceId: string) => {
  const res = await axiosInstance.post(
    `/schedules/delete-workspace/${id}`,
    workspaceId
  );
  return res.data;
};

export const useGroupSchedule = (scheduleId: string) => {
  return useQuery({
    queryKey: ["groupSchedule", scheduleId],
    queryFn: () => getGroupSchedule(scheduleId),
    enabled: !!scheduleId,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateWorkSpaceRequest }) =>
      createWorkspace(id, data),
    onSuccess: (data, variables) => {
      console.log("워크스페이스 등록 성공: ", data);
      queryClient.invalidateQueries({
        queryKey: ["groupSchedule", variables.id],
      });
    },
    onError: (err) => {
      console.error("워크스페이스 등록 실패: ", err);
    },
  });
};

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, workspaceId }: { id: string; workspaceId: string }) =>
      deleteWorkspace(id, workspaceId),
    onSuccess: (data, id) => {
      console.log("워크스페이스 삭제 성공: ", data);
      queryClient.invalidateQueries({
        queryKey: ["groupSchedule", id],
      });
    },
    onError: (err) => {
      console.error("워크스페이스 삭제 실패: ", err);
    },
  });
};

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

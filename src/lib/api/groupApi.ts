import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";
import { useRouter } from "next/navigation";

export interface CreateGroupRequest {
  groupName: string;
  description: string;
}

export interface UpdateGroupRequest {
  groupName: string;
  description: string;
}

export interface GroupResponse {
  code: string;
  message: string;
  data: null;
  id: string;
}

// 전체 그룹 조회
const getGroups = async () => {
  const res = await axiosInstance.get("/groups");
  return res.data;
};

// 특정 그룹 정보 조회
const getGroup = async (id: string) => {
  const res = await axiosInstance.get(`/groups`, { params: { id } });
  return res.data;
};

const createGroup = async (data: CreateGroupRequest) => {
  const res = await axiosInstance.post("/groups/create", data);
  return res.data;
};

const updateGroup = async (id: string, data: UpdateGroupRequest) => {
  const res = await axiosInstance.patch(`/groups/${id}`, data);
  return res.data;
};

const deleteGroup = async (id: string) => {
  const res = await axiosInstance.delete(`/groups/${id}`, { data: {} });
  return res.data;
};

const getGroupSchedules = async (groupId: string) => {
  const res = await axiosInstance.get(`/groups/schedule-groups/${groupId}`);
  return res.data;
};

const getGroupStatistics = async (groupId: string) => {
  const res = await axiosInstance.get(`/groups/${groupId}/statistics`);
  return res.data;
};

const getGroupMembers = async (groupId: string) => {
  const res = await axiosInstance.get(`/groups/${groupId}/member`);
  return res.data;
};

const leaveGroup = async (groupId: string) => {
  const res = await axiosInstance.patch(`/goups/${groupId}/leave`);
  return res.data;
};

const removeGroupMember = async (groupId: string, userId: string) => {
  const res = await axiosInstance.patch(`/groups/${groupId}/members/${userId}`);
  return res.data;
};

export const useRemoveGroupMember = (groupId: string, userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => removeGroupMember(groupId, userId),
    onSuccess: (data) => {
      console.log("그룹 멤버 내보내기 성공: ", data);
      queryClient.invalidateQueries({ queryKey: ["groupMembers", groupId] });
    },
    onError: (err) => {
      console.error("그룹 멤버 내보내기 실패: ", err);
    },
  });
};

export const useLeaveGroup = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: leaveGroup,
    onSuccess: (data) => {
      console.log("그룹 나가기 성공: ", data);
      queryClient.invalidateQueries({ queryKey: ["user", "groupSchedule"] });
      router.push(`/`);
    },
    onError: (err) => {
      console.error("그룹 나가기 실패: ", err);
    },
  });
};

export const useGroupSchedules = (groupId: string) => {
  return useQuery({
    queryKey: ["groupSchedules", groupId],
    queryFn: () => getGroupSchedules(groupId),
    enabled: !!groupId,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useGroupStatistics = (groupId: string) => {
  return useQuery({
    queryKey: ["groupStatics", groupId],
    queryFn: () => getGroupStatistics(groupId),
    enabled: !!groupId,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useGroupMembers = (groupId: string) => {
  return useQuery({
    queryKey: ["groupMembers", groupId],
    queryFn: () => getGroupMembers(groupId),
    enabled: !!groupId,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useGroup = (id: string) => {
  return useQuery({
    queryKey: ["group", id],
    queryFn: () => getGroup(id),
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useGroups = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useCreateGroup = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGroup,
    onSuccess: (data) => {
      console.log("그룹 생성 성공 : ", data);
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      //router.push(`/group/${data.id}`);
      router.push(`/group/10001`);
    },
    onError: (err) => {
      console.error("그룹 생성 실패 : ", err);
    },
  });
};

export const useUpdateGroup = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateGroupRequest }) =>
      updateGroup(id, data),
    onSuccess: (data) => {
      console.log("그룹 정보 수정 성공 : ", data);
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["group", data.id] });

      //router.push(`/group/${data.id}`);
      router.push(`/group/10001`);
    },
    onError: (err) => {
      console.error("그룹 정보 수정 실패 : ", err);
    },
  });
};

export const useDeleteGroup = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteGroup(id),
    onSuccess: (data) => {
      console.log("그룹 삭제 성공 : ", data);
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      //router.push(`/group/${data.id}`);
      router.push(`/`);
    },
    onError: (err) => {
      console.error("그룹 삭제 실패 : ", err);
    },
  });
};

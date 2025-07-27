import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";
import { useRouter } from "next/navigation";
import Toast from "@/components/ui/Toast";
import ToastWell from "@/components/ui/ToastWell";

export interface UpdateMemberPermissionsReqeust {
  groupId: string;
  userId: string;
  groupRole: string;
}

export interface RemoveGroupMemberRequest {
  groupId: string;
  userId: string;
}

// 전체 그룹 조회
const getGroups = async () => {
  const res = await axiosInstance.get("/groups");
  return res.data;
};

/**
 * 그룹 정보 조회
 * @param groupId 그룹 이름
 * @returns
 */
export const getGroup = async (groupId: string) => {
  const res = await axiosInstance.get(`/groups/schedule-groups/${groupId}`);
  return res.data;
};

/**
 * 그룹 생성
 * @param groupName 그룹 이름
 * @param description 그룹 설명
 * @returns
 */
export const createGroup = async (groupInfo: GroupInfoType) => {
  const response = await axiosInstance.post("/groups/create", groupInfo);
  return response.data;
};

/**
 * 그룹 정보 수정
 * @param groupId 그룹 ID
 * @param groupName 그룹 이름
 * @param description 그룹 설명
 * @returns
 */
export const updateGroup = async (groupId: string, data: GroupInfoType) => {
  const response = await axiosInstance.patch(`/groups/${groupId}`, data);
  return response.data;
};

/**
 * 그룹 삭제
 * @param groupId 그룹 ID
 * @returns
 */
export const deleteGroup = async (groupId: string) => {
  const res = await axiosInstance.delete(`/groups/${groupId}`, { data: {} });
  return res.data;
};

/**
 * 일회성 일정으로 그룹 일정으로 편입
 * @param scheduleId 스케줄 ID
 * @param groupId 그룹 ID
 * @returns
 */
export const moveSchedule = async (scheduleId: number, groupId: number) => {
  const response = await axiosInstance.patch(`/groups/move-schedule`, {
    groupId,
    scheduleId,
  });
  return response.data;
};

const getGroupSchedules = async (groupId: string) => {
  const res = await axiosInstance.get(`/groups/schedule-groups/${groupId}`);
  return res.data;
};

export const getGroupStatistics = async (groupId: string) => {
  const res = await axiosInstance.get(`/groups/${groupId}/statistics`);
  return res.data;
};

export const getGroupMembers = async (groupId: string) => {
  const res = await axiosInstance.get(`/groups/${groupId}/member`);
  return res.data;
};

const leaveGroup = async (groupId: string) => {
  const res = await axiosInstance.patch(`/groups/${groupId}/leave`);
  return res.data;
};

const removeGroupMember = async (data: RemoveGroupMemberRequest) => {
  const res = await axiosInstance.patch(
    `/groups/${data.groupId}/members/${data.userId}`
  );
  return res.data;
};

const updateMemberPermissions = async (
  data: UpdateMemberPermissionsReqeust
) => {
  const res = await axiosInstance.patch(
    `/groups/${data.groupId}/members`,
    data
  );
  return res.data;
};

const addGroupMember = async (groupId: string) => {
  const res = await axiosInstance.post(`/groups/${groupId}/member`);
  return res.data;
};

export const useAddGroupMember = (setIsMember: (bool: boolean) => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (groupId: string) => addGroupMember(groupId),
    onSuccess: (_, groupId) => {
      ToastWell("🎉", "그룹에 참여했습니다");
      setIsMember(true);
      router.push(`/group/${groupId}`);
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });
      queryClient.invalidateQueries({ queryKey: ["groupMembers", groupId] });
    },
    onError: (err: Error, groupId) => {
      setIsMember(true);
      router.push(`/group/${groupId}`);
      console.log(err);
    },
  });
};

export const useUpdateMemberPermissions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateMemberPermissionsReqeust) =>
      updateMemberPermissions(data),
    onSuccess: (_, variables) => {
      ToastWell("✅", "권한 변경에 성공했습니다");
      queryClient.invalidateQueries({
        queryKey: ["groupMembers", variables.groupId],
      });
    },
    onError: (err) => {
      Toast("권한 변경에 실패했습니다");
      console.error("권한 변경 실패: ", err);
    },
  });
};

export const useRemoveGroupMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RemoveGroupMemberRequest) => removeGroupMember(data),
    onSuccess: (_, variables) => {
      ToastWell("✅", "그룹 멤버를 내보냈습니다");
      queryClient.invalidateQueries({
        queryKey: ["groupMembers", variables.groupId],
      });
    },
    onError: (err) => {
      Toast("그룹짱은 내보낼 수가 없습니다");
      console.error("그룹 멤버 내보내기 실패: ", err);
    },
  });
};

export const useLeaveGroup = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: leaveGroup,
    onSuccess: () => {
      ToastWell("✅", "그룹에서 나갔습니다");
      queryClient.invalidateQueries({ queryKey: ["user", "groupSchedule"] });
      router.push(`/`);
    },
    onError: (err) => {
      console.error("그룹 나가기 실패: ", err);
      Toast("그룹 나가기에 실패했습니다");
    },
  });
};

export const useGroupSchedules = (groupId: string, isMember: boolean) => {
  return useQuery({
    queryKey: ["groupSchedule", groupId],
    queryFn: () => getGroupSchedules(groupId),
    enabled: !!groupId && isMember,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGroupStatistics = (groupId: string) => {
  return useQuery({
    queryKey: ["groupStatics", groupId],
    queryFn: () => getGroupStatistics(groupId),
    enabled: !!groupId,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGroupMembers = (groupId: string) => {
  return useQuery({
    queryKey: ["groupMembers", groupId],
    queryFn: () => getGroupMembers(groupId),
    enabled: !!groupId,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
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

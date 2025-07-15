import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";
import { useRouter } from "next/navigation";

export interface CreateGroupRequest {
  name: string;
  description: string;
}

export interface UpdateGroupRequest {
  name: string;
  description: string;
}

export interface GroupResponse {
  code: string;
  message: string;
  data: null;
  id: string;
}

const getGroups = async () => {
  const res = await axiosInstance.get("/groups");
  return res.data;
};

const createGroup = async (data: CreateGroupRequest) => {
  const res = await axiosInstance.post("/groups/create", data);
  return res.data;
};

// const updateGroup = async (id: string, data: UpdateGroupRequest) => {
//   const res = await axiosInstance.patch(`/groups/${id}`, data);
//   return res.data;
// };

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
      router.push(`/group/1`);
    },
    onError: (err) => {
      console.error("그룹 생성 실패 : ", err);
    },
  });
};

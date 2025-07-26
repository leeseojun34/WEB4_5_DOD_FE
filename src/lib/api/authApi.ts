import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";
import { useRouter } from "next/navigation";
import { logout } from "./userApi";
import ToastWell from "@/components/ui/ToastWell";
import Toast from "@/components/ui/Toast";

// 프로필 이름 업데이트
const updateName = async (newName: string) => {
  const res = await axiosInstance.patch("/member/me", null, {
    params: { username: newName },
  });
  return res.data;
};

export const useUpdateName = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateName,
    onSuccess: (data) => {
      console.log("이름 변경 성공: ", data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      ToastWell("🎉", "이름 수정 완료!");
    },
    onError: (err) => {
      console.error("이름 변경 실패: ", err);
      Toast("이름 수정 실패");
    },
  });
};

// 프로필 이미지 업데이트
export const useUpdateProfileImg = () => {
  return useMutation({
    mutationFn: () => axiosInstance.patch("/member/profile"),
    onSuccess: () => {
      ToastWell("🎉", "프로필 랜덤 수정 완료!");
    },
    onError: (err) => {
      console.error("프로필 이미지 수정 실패", err);
      Toast("프로필 랜덤 수정 실패");
    },
  });
};

// 즐겨찾는 역 등록
interface FavoriteLocation {
  favoriteLocationId?: number;
  stationName: string;
}

export const useFavoriteLocation = () => {
  return useQuery<FavoriteLocation>({
    queryKey: ["favoriteLocation"],
    queryFn: async () => {
      const res = await axiosInstance.get("/favorite-location");
      const list = res.data.data;
      return list.length > 0 ? list[0] : { stationName: "미등록" };
    },
  });
};

interface CreateFavoritePayload {
  stationName: string;
  latitude: number;
  longitude: number;
}

const addFavoriteLocation = async (payload: CreateFavoritePayload) => {
  const res = await axiosInstance.post("/favorite-location", payload);
  return res.data;
};

export const useAddFavoriteLocation = () => {
  return useMutation({
    mutationFn: addFavoriteLocation,
    onSuccess: () => {
      console.log("주변역 등록 완료");
      ToastWell("🎉", "주변역 등록 완료!");
    },
    onError: (error) => {
      console.error("주변역 등록 실패", error);
      Toast("주변역 등록 실패");
    },
  });
};

// 즐겨찾기 역 수정

interface FavoritePayload {
  favoritePlaceId: number;
  stationName: string;
  latitude: number;
  longitude: number;
}

const updateFavoriteLocation = async (payload: FavoritePayload) => {
  return await axiosInstance.patch("/favorite-location", payload);
};

export const useUpdateFavoriteLocation = () => {
  return useMutation({
    mutationFn: updateFavoriteLocation,
    onSuccess: () => {
      console.log("주변역 수정 완료");
      ToastWell("🎉", "주변역 수정 완료!");
    },
    onError: (err) => {
      console.error("주변역 등록 실패", err);
      Toast("주변역 수정 실패");
    },
  });
};

// 로그아웃
export const useLogoutMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      ToastWell("😇", "로그아웃되었습니다!");
      router.push("/auth/login");
    },
    onError: (err) => {
      console.error("로그아웃 실패", err);
      Toast("로그아웃 실패");
    },
  });
};

// 회원 탈퇴
export const useDeactiveMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: () => axiosInstance.delete("/member/withdraw"),
    onSuccess: () => {
      ToastWell("😇", "탈퇴되었습니다!");

      router.push("/auth/login");
    },
    onError: (err) => {
      console.error("탈퇴 실패", err);
      Toast("탈퇴 실패");
    },
  });
};

const registerCalendarId = async (publicCalendarId: string) => {
  return await axiosInstance.post("/calendar/public-id", publicCalendarId);
};

//구글 캘린더 Id 조회
export const useGoogleCalendarId = () => {
  return useQuery({
    queryKey: ["calendarId"],
    queryFn: async () => {
      const res = await axiosInstance.get("/calendar/public-id");
      return res.data.data;
    },
    retry: 0,
  });
};

// 구글 캘런더 Id 등록 (post)
export const useResgisterCalendarId = () => {
  return useMutation({
    mutationFn: registerCalendarId,
    onSuccess: () => {
      ToastWell("🎉", "구글 캘린더 등록 완료!");
    },
  });
};

// 즐겨찾는 시간대
export const useFavoriteTime = () => {
  return useQuery({
    queryKey: ["favoriteTime"],
    queryFn: async () => {
      const res = await axiosInstance.get("/favorite-timetable");
      return res.data;
    },
    retry: 0,
  });
};

const editFavoriteTime = async () => {
  return await axiosInstance.post("/favorite-timetable");
};

export const useUpdateFavoriteTime = () => {
  return useMutation({
    mutationFn: editFavoriteTime,
    onSuccess: () => {
      ToastWell("🎉", "즐겨찾는 시간 수정 완료!");
    },
  });
};

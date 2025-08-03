"use client";

import { setInviteEvent } from "@/lib/api/scheduleApi";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import GlobalLoading from "@/app/loading";
import Toast from "@/components/ui/Toast";
import ToastWell from "@/components/ui/ToastWell";
import { addGroupMember } from "@/lib/api/groupApi";
// TODO: 이벤트 url 및 이미지 url 변경 필요

const InvitePage = () => {
  const { eventId, groupId, group } = useParams();
  const router = useRouter();

  const setInviteEventMember = async () => {
    if (group === "true") {
      try {
        await addGroupMember(groupId as string);
        ToastWell("🎉", "일정 조율을 위해 그룹에 참여했습니다!");
      } catch (error) {
        if (error instanceof AxiosError) {
          Toast(error.response?.data.message);
        } else {
          Toast("알 수 없는 오류가 발생했습니다.");
        }
      }
    }

    try {
      await setInviteEvent(Number(eventId), Number(groupId));
      ToastWell("🎉", "일정 초대가 완료되었어요!");
      router.push(`/meeting/${eventId}/coordinate`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          localStorage.setItem("redirect", `${window.location.pathname}`);
          router.push("/auth/login");
          Toast("로그인 후 이용해주세요.");
          return;
        }
        Toast(error.response?.data.message);
        router.push(`/meeting/${eventId}/coordinate`);
      }
    }
  };

  useEffect(() => {
    setInviteEventMember();
  }, []);

  if (!eventId || !groupId) {
    Toast("잘못된 접근입니다.");
    router.push("/");
    return null;
  }

  return <GlobalLoading />;
};
export default InvitePage;

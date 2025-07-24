"use client";

import { setInviteEvent } from "@/lib/api/scheduleApi";
// import { Metadata } from "next";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import GlobalLoading from "@/app/loading";
import Toast from "@/components/ui/Toast";

// TODO: 이벤트 url 및 이미지 url 변경 필요

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ eventId: string; groupId: string }>;
// }): Promise<Metadata> {
//   const { eventId, groupId } = await params;

//   return {
//     title: `일정 초대 - 이때 어때`,
//     description: `이때 어때에서 친구들과 함께 일정을 조율해보세요!`,
//     openGraph: {
//       title: `일정 초대 - 이때 어때`,
//       description: `이때 어때에서 친구들과 함께 일정을 조율해보세요!`,
//       url: `https://localhost:3000/meeting/${eventId}/coordinate/${groupId}`,
//       siteName: "이때 어때",
//       locale: "ko_KR",
//       type: "website",
//     },
//   };
// }

const InvitePage = () => {
  const { eventId, groupId } = useParams();
  const router = useRouter();

  const setInviteEventMember = async () => {
    try {
      const { data } = await setInviteEvent(Number(eventId), Number(groupId));
      console.log(data);
      router.push(`/meeting/${eventId}/coordinate`);
    } catch (error) {
      console.error(error);
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

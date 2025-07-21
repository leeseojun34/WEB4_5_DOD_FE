import { setInviteEvent } from "@/lib/api/scheduleApi";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { AxiosError } from "axios";
// TODO: 이벤트 url 및 이미지 url 변경 필요
// 비로그인시 로그인으로 리다이렉트
// 로그인 중이면 가입 시키고 원래 이벤트 정보로 리다이렉트

// test eventId: 1, groupId: 10015
// https://localhost:3000/meeting/1/coordinate/10015

export async function generateMetadata({
  params,
}: {
  params: Promise<{ eventId: string; groupId: string }>;
}): Promise<Metadata> {
  const { eventId, groupId } = await params;

  return {
    title: `일정 초대 - 이때 어때`,
    description: `이때 어때에서 친구들과 함께 일정을 조율해보세요!`,
    openGraph: {
      title: `일정 초대 - 이때 어때`,
      description: `이때 어때에서 친구들과 함께 일정을 조율해보세요!`,
      url: `https://localhost:3000/meeting/${eventId}/coordinate/${groupId}`,
      siteName: "이때 어때",
      locale: "ko_KR",
      type: "website",
    },
  };
}

const InvitePage = async ({
  params,
}: {
  params: Promise<{ eventId: string; groupId: string }>;
}) => {
  const { eventId, groupId } = await params;
  try {
    const { data } = await setInviteEvent(Number(eventId), Number(groupId));
    console.log(data);
    return redirect(`/meeting/${eventId}/coordinate`);
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        return redirect("/auth/login");
      }
    }
  }
  return null;
};
export default InvitePage;

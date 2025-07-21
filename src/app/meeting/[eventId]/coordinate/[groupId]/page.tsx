// import { setInviteEvent } from "@/lib/api/scheduleApi";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "일정 초대",
  description: "일정 초대",
};

const InvitePage = async ({
  params,
}: {
  params: { eventId: string; groupId: string };
}) => {
  const { eventId, groupId } = params;
  console.log(eventId, groupId);
  // const { data } = await setInviteEvent(Number(eventId), Number(groupId));
  // console.log(data);
  return <div>page</div>;
};
export default InvitePage;

import UserSchedule from "@/components/dashboard/UserSchedule";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이때어때 - 나의 이때어때 일정",
  description: "이때어때 - 나의 이때어때 일정",
};

const UserSchedulePage = () => {
  return <UserSchedule />;
};
export default UserSchedulePage;

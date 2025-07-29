import EditScheduleInfoPage from "@/components/feature/schedule/editSchedule/EditScheduleInfoPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이때어때 - 일정 정보 수정",
  description: "이때어때 - 일정 정보 수정",
};

const EditScheduleInfo = () => {
  return <EditScheduleInfoPage />;
};

export default EditScheduleInfo;

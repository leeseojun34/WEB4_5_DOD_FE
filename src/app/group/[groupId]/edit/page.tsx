import EditGroupPage from "@/components/feature/group/EditGroupPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이때어때 - 그룹 정보 수정",
  description: "이때어때 - 그룹 정보 수정",
};

const EditGroup = () => {
  return <EditGroupPage />;
};

export default EditGroup;

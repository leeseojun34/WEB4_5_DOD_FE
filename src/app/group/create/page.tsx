import CreateGroupPage from "@/components/feature/group/CreateGroupPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이때어때 - 그룹 생성",
  description: "이때어때 - 그룹 생성",
};

const CreateGroup = () => {
  return <CreateGroupPage />;
};

export default CreateGroup;

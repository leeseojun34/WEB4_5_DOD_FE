import EditWorkspace from "@/components/feature/schedule/edit/workspace/EditWorkspace";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이때어때 - 워크스페이스 관리",
  description: "이때어때 - 워크스페이스 관리",
};

const EditWorkspacePage = () => {
  return (
    <>
      <EditWorkspace />
    </>
  );
};
export default EditWorkspacePage;

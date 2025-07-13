"use client";
import EditWorkspace from "@/components/feature/schedule/edit/workspace/EditWorkspace";
import WorkspaceBottomSheet from "@/components/feature/schedule/edit/workspace/WorkspaceBottomSheet";
import { useState } from "react";

const EditWorkspacePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState<{
    type: string;
    name: string;
    url: string;
  } | null>(null);

  const handleEditClick = (data: {
    type: string;
    name: string;
    url: string;
  }) => {
    setDefaultValue(data);
    setIsOpen(true);
  };
  return (
    <>
      <EditWorkspace onEditClick={handleEditClick} />
      {isOpen && (
        <WorkspaceBottomSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          defaultValue={defaultValue}
        />
      )}
    </>
  );
};
export default EditWorkspacePage;

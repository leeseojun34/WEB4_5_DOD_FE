import { useState } from "react";

export interface WorkspaceModalValue {
  type: string;
  name: string;
  url: string;
  workspaceId: string;
}

export const useWorkspaceModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] =
    useState<WorkspaceModalValue | null>(null);

  const openModal = (workspace: WorkspaceModalValue) => {
    setSelectedWorkspace(workspace);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedWorkspace(null);
    setIsOpen(false);
  };

  return {
    isOpen,
    selectedWorkspace,
    openModal,
    closeModal,
  };
};

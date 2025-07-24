import { useState } from "react";
import {
  useCreateWorkspace,
  useDeleteWorkspace,
  useUpdateScheduleInfo,
} from "@/lib/api/scheduleApi";

export type WorkspacePlatformType =
  | "GITHUB"
  | "NOTION"
  | "FIGMA"
  | "GOOGLE_DOCS"
  | "CANVA"
  | "MIRO";

interface UseWorkspaceFormProps {
  scheduleId: string;
  workspaceId: string;
  defaultValue?: {
    type: string;
    name: string;
    url: string;
  } | null;
  onClose: () => void;
}

export const useWorkspaceForm = ({
  scheduleId,
  workspaceId,
  defaultValue,
  onClose,
}: UseWorkspaceFormProps) => {
  const [name, setName] = useState(defaultValue?.name ?? "");
  const [url, setUrl] = useState(defaultValue?.url ?? "");
  const [type, setType] = useState<WorkspacePlatformType | "">(
    (defaultValue?.type as WorkspacePlatformType) ?? ""
  );

  const { mutate: createWorkspace } = useCreateWorkspace();
  const { mutate: deleteWorkspace } = useDeleteWorkspace({
    workspaceId,
    scheduleId,
  });
  const updateWorkspace = useUpdateScheduleInfo();

  const handleCreateOrUpdate = () => {
    if (!type) return;

    if (defaultValue) {
      updateWorkspace.mutate({
        scheduleId,
        data: {
          workspaceType: type,
          workspaceName: name,
          url,
        },
      });
    } else {
      createWorkspace({
        id: scheduleId,
        data: {
          workspaceType: type,
          workspaceName: name,
          url,
        },
      });
    }

    onClose();
  };

  const handleDelete = () => {
    if (!type) return;
    deleteWorkspace();
    onClose();
  };

  return {
    name,
    setName,
    url,
    setUrl,
    type,
    setType,
    handleCreateOrUpdate,
    handleDelete,
  };
};

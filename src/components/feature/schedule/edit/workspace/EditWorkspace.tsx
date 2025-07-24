"use client";

import { useGroupSchedule } from "@/lib/api/scheduleApi";
import WorkspaceItem from "./WorkspaceItem";
import { useParams } from "next/navigation";
import WorkspaceSkeletonItem from "./WorkspaceSkeletonItem";
import { motion } from "framer-motion";
import WorkspaceBottomSheet from "./WorkspaceBottomSheet";
import { useWorkspaceModal } from "./hooks/useWorkspaceModal";
import { itemVariants, listVariants } from "../../motion";

type WorkspacePlatformType =
  | "GITHUB"
  | "NOTION"
  | "MIRO"
  | "FIGMA"
  | "CANVA"
  | "GOOGLE_DOCS";

interface WorkspaceType {
  type: WorkspacePlatformType;
  name: string;
  url: string;
  workspaceId: string;
}

const EditWorkspace = () => {
  const params = useParams();
  const id = params.id as string;
  const { data, isPending } = useGroupSchedule(id);
  const workspaces = data?.data?.workspaces;

  const { isOpen, selectedWorkspace, openModal, closeModal } =
    useWorkspaceModal();

  return (
    <>
      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {isPending &&
          Array.from({ length: 4 }).map((_, i) => (
            <WorkspaceSkeletonItem key={i} />
          ))}

        {workspaces?.map((workspace: WorkspaceType) => (
          <motion.div variants={itemVariants} key={workspace.workspaceId}>
            <WorkspaceItem
              type={workspace.type}
              name={workspace.name}
              url={workspace.url}
              onClick={() => openModal(workspace)}
            />
          </motion.div>
        ))}
      </motion.div>

      {isOpen && selectedWorkspace && (
        <WorkspaceBottomSheet
          isOpen={isOpen}
          setIsOpen={closeModal}
          defaultValue={selectedWorkspace}
          workspaceId={selectedWorkspace.workspaceId}
        />
      )}
    </>
  );
};

export default EditWorkspace;

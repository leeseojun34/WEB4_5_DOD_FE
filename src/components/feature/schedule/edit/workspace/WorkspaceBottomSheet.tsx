import BottomSheet from "@/components/ui/BottomSheet";
import githubIcon from "@/assets/icon/github_icon.svg";
import notionIcon from "@/assets/icon/notion_icon.svg";
import miroIcon from "@/assets/icon/miro_icon.svg";
import canvaIcon from "@/assets/icon/canva_icon.svg";
import googledocsIcon from "@/assets/icon/googledocs_icon.svg";
import figmaIcon from "@/assets/icon/figma_icon.svg";
import Image from "next/image";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import BottomSheetHeader from "@/components/layout/BottomSheetHeader";
import {
  useCreateWorkspace,
  useDeleteWorkspace,
  WorkSpaceType,
} from "@/lib/api/scheduleApi";

const workspaceLogos = {
  GITHUB: githubIcon,
  NOTION: notionIcon,
  MIRO: miroIcon,
  FIGMA: figmaIcon,
  CANVA: canvaIcon,
  GOOGLE_DOS: googledocsIcon,
} as const;

const workspaceTypes = [
  "GITHUB",
  "NOTION",
  "FIGMA",
  "GOOGLE_DOS",
  "CANVA",
  "MIRO",
] as const;

const WorkspaceBottomSheet = ({
  isOpen,
  setIsOpen,
  defaultValue,
  id,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  defaultValue?: { type: string; name: string; url: string } | null;
  id: string;
}) => {
  const [name, setName] = useState(defaultValue?.name ?? "");
  const [url, setUrl] = useState(defaultValue?.url ?? "");
  const [type, setType] = useState<WorkSpaceType | "">(
    (defaultValue?.type as WorkSpaceType) ?? ""
  );
  const { mutate: createWorkspace } = useCreateWorkspace();
  const { mutate: deleteWorkspace } = useDeleteWorkspace();

  const handleCreateWorkSpace = () => {
    if (!type) return;

    createWorkspace({
      id,
      data: {
        workspace: type,
        workspaceName: name,
        url,
      },
    });
  };

  const handleDeleteWorkSpace = () => {};

  return (
    <BottomSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      initialSnap={0}
      snapPoints={[0.5]}
    >
      {() => (
        <div className="px-5 w-full h-full flex flex-col gap-4">
          {defaultValue ? (
            <BottomSheetHeader
              setIsOpen={setIsOpen}
              title="워크스페이스 편집"
            />
          ) : (
            <BottomSheetHeader
              setIsOpen={setIsOpen}
              title="워크스페이스 등록"
            />
          )}
          <div className=" w-full max-w-[740px] px-5 flex flex-col mx-auto gap-4 ">
            {/* 워크 스페이스 종류 */}
            <div className="w-full  space-y-4">
              <h3 className="text-xs font-medium ml-2">워크 스페이스 종류</h3>
              <div className="flex gap-6 justify-center items-center">
                {workspaceTypes.map((workspaceType) => (
                  <button
                    key={workspaceType}
                    onClick={() => setType(workspaceType)}
                    className={`w-8 h-8 flex justify-center items-center cursor-pointer rounded-lg transition-all duration-200
        ${
          type === workspaceType
            ? "bg-[color:var(--color-muted)]"
            : "hover:bg-[color:var(--color-muted)]"
        }`}
                  >
                    <div className="w-5 h-5 relative flex-shrink-0">
                      <Image
                        src={workspaceLogos[workspaceType]}
                        alt={workspaceType}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Input
              maxLength={15}
              label="워크스페이스 이름"
              placeholder="워크스페이스 이름을 입력해주세요"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
            <Input
              label="URL"
              placeholder="워크스페이스 링크 주소를 입력해주세요"
              value={url}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUrl(e.target.value)
              }
            />
          </div>

          {/* 버튼 */}
          <div className="w-full flex justify-center items-center flex-col gap-4 mt-8">
            {defaultValue && (
              <button
                className="text-[color:var(--color-red)] text-xs cursor-pointer"
                onClick={handleDeleteWorkSpace}
              >
                삭제하기
              </button>
            )}
            <Button onClick={handleCreateWorkSpace}>저장하기</Button>
          </div>
        </div>
      )}
    </BottomSheet>
  );
};
export default WorkspaceBottomSheet;

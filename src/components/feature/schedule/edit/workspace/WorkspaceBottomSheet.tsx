import BottomSheet from "@/components/ui/BottomSheet";

const WorkspaceBottomSheet = ({
  isOpen,
  setIsOpen,
  defaultValue,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  defaultValue?: { type: string; name: string; url: string } | null;
}) => {
  return (
    <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen}>
      {() => (
        <h1>{defaultValue ? "워크스페이스 편집" : "워크스페이스 등록"}</h1>
      )}
    </BottomSheet>
  );
};
export default WorkspaceBottomSheet;

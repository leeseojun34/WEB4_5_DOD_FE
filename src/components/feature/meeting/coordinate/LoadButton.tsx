import { FolderInput } from "lucide-react";

const LoadButton = () => {
  return (
    <div className="flex items-center gap-1">
      <div className="text-[color:var(--color-gray-placeholder)] text-xs">
        불러오기
      </div>
      <FolderInput className="w-[10px] h-[10px] text-[color:var(--color-gray-placeholder)]" />
    </div>
  );
};

export default LoadButton;

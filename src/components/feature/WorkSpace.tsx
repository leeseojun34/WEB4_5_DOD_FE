import { ChevronRight, Link2, Pen } from "lucide-react";
import { SiGithub, SiMiro, SiNotion } from "react-icons/si";

const WorkSpace = () => {
  return (
    <div className="bg-[color:var(--color-white)] px-5 py-4 gap-4 rounded-lg flex flex-col shadow-[var(--shadow-common)]">
      <div className="flex w-full justify-between items-center">
        <div className="flex gap-4 items-center">
          <div>
            <Link2 className="w-4 h-4 text-[color:var(--color-black)]" />
          </div>
          <div className="text-[color:var(--color-primary-300)] text-xs">
            워크 스페이스
          </div>
        </div>
        <div>
          <Pen className="w-3 h-3 text-[color:var(--color-gray)]" />
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-4 items-center">
            <div>
              <SiNotion className="w-4 h-4 text-[color:var(--color-black)]" />
            </div>
            <div className="text-[color:var(--color-black)] text-sm">
              프론트엔드 기획서
            </div>
          </div>
          <div>
            <ChevronRight className="w-[14px] h-[14px] text-[color:var(--color-gray)]" />
          </div>
        </div>
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-4 items-center">
            <div>
              <SiGithub className="w-4 h-4 text-[color:var(--color-black)]" />
            </div>
            <div className="text-[color:var(--color-black)] text-sm">
              박준규 팬미팅
            </div>
          </div>
          <div>
            <ChevronRight className="w-[14px] h-[14px] text-[color:var(--color-gray)]" />
          </div>
        </div>
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-4 items-center">
            <div>
              <SiMiro className="w-4 h-4 text-[color:var(--color-black)] bg-amber-300 rounded-xs p-[2px]" />
            </div>
            <div className="text-[color:var(--color-black)] text-sm">
              박준규 팬미팅
            </div>
          </div>
          <div>
            <ChevronRight className="w-[14px] h-[14px] text-[color:var(--color-gray)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkSpace;

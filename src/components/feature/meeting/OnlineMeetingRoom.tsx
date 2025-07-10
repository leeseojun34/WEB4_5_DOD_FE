import { AtSign, ChevronRight, Pen } from "lucide-react";
import { BiLogoZoom } from "react-icons/bi";

const OnlineMeetingRoom = () => {
  return (
    <div className="bg-[color:var(--color-white)] px-5 py-4 gap-4 rounded-lg flex flex-col shadow-[--shadow-common]">
      <div className="flex w-full justify-between items-center">
        <div className="flex gap-4 items-center">
          <div>
            <AtSign className="w-3 h-3 text-[color:var(--color-black)]" />
          </div>
          <div className="text-[color:var(--color-primary-300)] text-xs">
            온라인 회의장
          </div>
        </div>
        <div>
          <Pen className="w-3 h-3 text-[color:var(--color-gray)]" />
        </div>
      </div>
      <div className="flex w-full justify-between items-center">
        <div className="flex gap-4 items-center">
          <div>
            <BiLogoZoom className="text-[color:var(--color-white)] bg-[color:var(--color-primary-400)] w-3 h-3 rounded-full px-[2px]" />
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
  );
};

export default OnlineMeetingRoom;

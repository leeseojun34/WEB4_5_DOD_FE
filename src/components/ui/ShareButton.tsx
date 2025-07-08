import { IoPaperPlaneOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";

/**
 * @param color - 버튼 색상
 *
 * 카카오톡 공유 api 연결 필요
 *
 * @returns 공유 버튼 컴포넌트
 */
const ShareButton = ({ color = "white" }: { color?: string }) => {
  return (
    <div
      className={`flex flex-row rounded-md px-5 py-4 gap-[90px] cursor-pointer shadow-md transition-all duration-300 hover:scale-101`}
      style={{ backgroundColor: color }}
    >
      <div className="flex flex-row gap-4">
        <div className="font-bold flex items-center justify-center">
          <IoPaperPlaneOutline />
        </div>
        <div className="flex flex-col justify-start">
          <div className="text-sm">일정 등록 링크 공유</div>
          <div className="text-[#8ac2ff] text-xs">
            시간 조율을 위해 링크를 공유해요
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <MdKeyboardArrowRight />
      </div>
    </div>
  );
};
export default ShareButton;

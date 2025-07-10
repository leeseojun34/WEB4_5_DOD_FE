import { IoPaperPlaneOutline } from "react-icons/io5";
import { MdHowToVote, MdKeyboardArrowRight } from "react-icons/md";

/**
 * @param title - 버튼 타이틀
 * @param description - 버튼 설명
 * @param mode - 버튼 모드 (share: 공유, vote: 투표)
 * @param color - 버튼 색상
 *
 * 카카오톡 공유 api 연결 필요
 *
 * @returns 공유 버튼 컴포넌트
 */
const ShareButton = ({
  title,
  description,
  mode = "share",
  color = "white",
}: {
  title: string;
  description: string;
  mode?: "share" | "vote";
  color?: string;
}) => {
  return (
    <>
      <div
        className={`flex flex-row rounded-md px-5 py-4 gap-24 cursor-pointer shadow-md transition-all duration-300 hover:scale-101`}
        style={{ backgroundColor: color }}
      >
        <div className="flex flex-row gap-4">
          <div className="font-bold flex items-center justify-center">
            {mode === "share" && <IoPaperPlaneOutline />}
            {mode === "vote" && <MdHowToVote />}
          </div>
          <div className="flex flex-col justify-start">
            <div className="text-sm">{title}</div>
            <div className="text-[#8ac2ff] text-xs">{description}</div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <MdKeyboardArrowRight />
        </div>
      </div>
    </>
  );
};
export default ShareButton;

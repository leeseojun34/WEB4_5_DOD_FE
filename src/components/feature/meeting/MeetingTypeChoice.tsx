import Tip from "@/components/ui/Tip";
import MeetingTypeOptions from "./MeetingTypeOptions";
import { Button } from "@/components/ui/Button";

const MeetingTypeChoice = () => {
  return (
    <main className="flex flex-col px-5 gap-8 min-h-screen relative pt-8 max-w-[740px]">
      <h1 className="text-xl font-bold">모임 유형을 선택해주세요</h1>
      <MeetingTypeOptions />
      <Tip>
        한번 모임은 그날 딱 한 번 만날 때 좋아요.
        <br />
        자주 모임은 그룹 안에서 소모임을 꾸리고 여러번 만날 수 있어요.
      </Tip>
      <div className="w-full flex items-center justify-center absolute bottom-9 left-0 px-5">
        <Button state="default">다음</Button>
      </div>
    </main>
  );
};
export default MeetingTypeChoice;

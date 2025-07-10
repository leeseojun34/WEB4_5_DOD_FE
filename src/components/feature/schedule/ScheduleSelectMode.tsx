"use client";

import ScheduleTitleText from "@/components/ui/ScheduleTitle";
import Input from "@/components/ui/Input";
import Tip from "@/components/ui/Tip";

const ScheduleSelectMode = () => {
  return (
    <>
      <div className="flex flex-col flex-1 gap-8">
        <div className="flex flex-col gap-4 mt-10">
          <ScheduleTitleText title="참여 인원 수와 모임 방식을 선택해주세요" />
        </div>
        <div className="mx-5">
          <div>
            <div className="flex items-center gap-2 w-1/3 mx-auto">
              <Input
                type="number"
                value={0}
                placeholder="0"
                onChange={() => {}}
              />
              <span> 명</span>
            </div>
            <div></div>
          </div>
          <div className="mt-8">
            <Tip>
              온라인은 온라인 회의장(줌, 디스코드 등)을 등록할 수 있어요. <br />
              오프라인은 직접 만날 장소(식당, 카페, 지하철역 등)를 등록할 수
              있어요.
            </Tip>
          </div>
        </div>
      </div>
    </>
  );
};
export default ScheduleSelectMode;

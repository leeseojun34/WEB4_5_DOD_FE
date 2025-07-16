import ScheduleSection from "./ScheduleSection";
import ActionButtons from "./ActionButtons";
import Tip from "@/components/ui/Tip";
import TitleWithShare from "./TitleWithShare";

// TODO: 나의 가능한 시간대, 함께 가능한 시간대 분리
// 분리 후 이동 경로 설정
// 라우터에 eventId 값 추가 해야 함
// 나: 불러오기 기능, 등록 기능 활성화, 확정 지으면 수정 불가
// 함께: 설정 불가능, socket? 불러와서 실시간 업데이트.. ? , 여러개 시간 겹칠경우 색 진하게 표현
// 결과보기: 별도의 페이지, 해당 이벤트 인원이 모두 참여 했다고 해야 버튼 활성화
//

const CoordinateContent = ({
  eventScheduleInfo,
}: {
  eventScheduleInfo: EventTimeMemberType[];
}) => {
  console.log(eventScheduleInfo);

  return (
    <div className="pt-6 px-5 pb-9 flex flex-col w-full items-center gap-7 sm:gap-8 sm:pt-10">
      <div className="w-full">
        <TitleWithShare />
      </div>
      <Tip>
        가능한 시간을 입력하면, 구성원들과 겹치는 시간대를 자동으로
        확인해드려요.
      </Tip>
      <ScheduleSection
        title={
          <>
            <span className="text-[color:var(--color-primary-400)]">함께 </span>
            가능한 시간대
          </>
        }
        className="block"
      />
      <ActionButtons className="sm:mt-2" />
    </div>
  );
};

export default CoordinateContent;

import ShareButton from "@/components/ui/ShareButton";
import PageTitle from "./PageTitle";
import { useEventDetail } from "@/lib/api/scheduleApi";
import { useParams } from "next/navigation";

const TitleWithShare = () => {
  const { eventId } = useParams();
  const { data: eventDetail } = useEventDetail(Number(eventId));

  console.log(eventDetail);

  return (
    <div className="flex flex-col gap-7 sm:gap-4">
      <PageTitle className="hidden sm:block">
        가능한 시간을 입력해주세요
      </PageTitle>
      <div className="w-full">
        <ShareButton
          title="일정 초대 링크 공유"
          description="시간 조율을 위해 링크를 공유해요"
        />
      </div>
      <PageTitle className="block sm:hidden">
        가능한 시간을 입력해주세요
      </PageTitle>
    </div>
  );
};

export default TitleWithShare;

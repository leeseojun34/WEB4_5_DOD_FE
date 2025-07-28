import ShareButton from "@/components/ui/ShareButton";
import PageTitle from "./PageTitle";
import { useEventDetail } from "@/lib/api/scheduleApi";
import { useParams } from "next/navigation";
import { useKakaoShare } from "@/lib/api/useKakaoShare";
import KakaoScript from "../../KakaoScript";
const TitleWithShare = ({ group }: { group: string }) => {
  const { eventId } = useParams();
  const { data: eventDetail } = useEventDetail(Number(eventId));
  const { shareWithTemplate } = useKakaoShare();

  // TODO: 초대 url 수정 필요
  const handleKakaoShare = () => {
    shareWithTemplate(
      "이때 어때에서 친구들과 함께 일정을 조율해보세요!",
      `https://localhost:3000/meeting/${eventId}/coordinate/${
        eventDetail?.data.groupId
      }${group === "true" ? "?group=true" : ""}`
    );
  };

  return (
    <div className="flex flex-col gap-7 sm:gap-4">
      <PageTitle className="hidden sm:block">
        가능한 시간을 입력해주세요
      </PageTitle>
      <div className="w-full">
        <ShareButton
          title="일정 초대 링크 공유"
          description="시간 조율을 위해 링크를 공유해요"
          onClick={handleKakaoShare}
        />
      </div>
      <PageTitle className="block sm:hidden">
        가능한 시간을 입력해주세요
      </PageTitle>
      <KakaoScript />
    </div>
  );
};

export default TitleWithShare;

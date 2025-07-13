import ShareButton from "@/components/ui/ShareButton";
import PageTitle from "./PageTitle";

const TitleWithShare = () => {
  return (
    <div className="flex flex-col gap-7 sm:gap-4">
      <div className="w-full block sm:hidden">
        <ShareButton
          title="일정 초대 링크 공유"
          description="시간 조율을 위해 링크를 공유해요"
        />
      </div>
      <PageTitle>가능한 시간을 입력해주세요</PageTitle>
      <div className="w-full hidden sm:block">
        <ShareButton
          title="일정 초대 링크 공유"
          description="시간 조율을 위해 링크를 공유해요"
        />
      </div>
    </div>
  );
};

export default TitleWithShare;

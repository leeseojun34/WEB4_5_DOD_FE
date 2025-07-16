import MeetingLocation from "../../MeetingLocation";
import ScheduleDetailContent from "./ScheduleDetailContent";
import ScheduleDetailLayout from "./ScheduleDetailLayout";

const OfflineScheduleDetail = () => {
  const scheduleId = "1";

  return (
    <ScheduleDetailLayout>
      <ScheduleDetailContent
        scheduleId={scheduleId}
        members={["박준규", "카리나"]}
        time="7월 5일 (금) 12:00 - 24:00"
        workspace={[
          { platform: "NOTION", name: "프론트엔드 기획서" },
          { platform: "GITHUB", name: "이때 어때 레포지토리" },
          { platform: "MIRO", name: "이때 어때 미로" },
        ]}
      >
        <MeetingLocation location="강남역" specificLocation="강남역 스타벅스" />
      </ScheduleDetailContent>
    </ScheduleDetailLayout>
  );
};

export default OfflineScheduleDetail;

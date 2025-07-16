import OfflineScheduleDetail from "./OfflineScheduleDetail";
import OnlineScheduleDetail from "./OnlineScheduleDetail";

const ScheduleDetail = () => {
  const isOnline = true;
  return <>{isOnline ? <OnlineScheduleDetail /> : <OfflineScheduleDetail />}</>;
};
export default ScheduleDetail;

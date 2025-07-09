import { Calendar } from "../feature/calendar/Calender";
import { Banner } from "./Banner";
import { MyGroupSection } from "./MyGroupSection";
import { MyScheduleSection } from "./MyScheduleSection";

const Dashboard = () => {
  return (
    <div className="w-full flex min-h-screen justify-center bg-[color:var(--color-gray-background)] py-4 px-5">
      <div className="w-full max-w-185 flex flex-col items-center gap-5">
        <Banner />
        <Calendar isCompact={true} />
        <MyScheduleSection />
        <MyGroupSection />
      </div>
    </div>
  );
};
export default Dashboard;

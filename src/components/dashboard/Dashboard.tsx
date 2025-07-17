import { useState } from "react";
import { Calendar } from "../feature/calendar/Calender";
import { Banner } from "./Banner";
import { MyScheduleSection } from "./MyScheduleSection";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { useDashboard } from "@/lib/api/dashboardApi";
import { formatDate } from "@/app/utils/dateFormat";
import GlobalLoading from "@/app/loading";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const { data: dashboardData, isPending } = useDashboard(
    formatDate(selectedDate ?? new Date())
  );

  if (isPending) return <GlobalLoading />;

  return (
    <section>
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="w-full flex min-h-screen justify-center bg-[color:var(--color-gray-background)] py-4 px-5 sm:pt-18">
        <div className="w-full max-w-185 flex flex-col items-center gap-5">
          <Banner />
          <Calendar
            isCompact={true}
            selected={selectedDate}
            setSelected={setSelectedDate}
          />
          <MyScheduleSection
            selectedDate={selectedDate!}
            schedules={dashboardData.data.schedules}
          />
          {/* <MyGroupSection groups={dashboardData.data.group} /> */}
        </div>
      </div>
      <div className="block sm:hidden">
        <Footer />
      </div>
    </section>
  );
};
export default Dashboard;

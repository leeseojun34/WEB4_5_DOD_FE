import { useEffect, useState } from "react";
import { Calendar } from "../feature/calendar/Calender";
import { Banner } from "./Banner";
import { MyGroupSection } from "./MyGroupSection";
import { MyScheduleSection } from "./MyScheduleSection";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { useDashboard } from "@/lib/api/dashboardApi";
import { formatDate } from "@/app/utils/dateFormat";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { data: dashboardData } = useDashboard(formatDate(selectedDate));

  useEffect(() => {
    if (dashboardData?.data) {
      console.log(dashboardData.data);
    }
  });

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
          <MyScheduleSection />
          <MyGroupSection />
        </div>
      </div>
      <div className="block sm:hidden">
        <Footer />
      </div>
    </section>
  );
};
export default Dashboard;

import { useEffect, useState } from "react";
import { Calendar } from "../feature/calendar/Calender";
import { Banner } from "./Banner";
import { MyScheduleSection } from "./MyScheduleSection";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { formatDate } from "@/app/utils/dateFormat";
import { MyGroupSection } from "./MyGroupSection";
import {
  DashboardDetailResponse,
  getDashboardDetail,
} from "@/lib/api/dashboardApi";
import { MyGroupSkeleton, MyScheduleSkeleton } from "./Skeleton";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [dashboardData, setDashboardData] =
    useState<DashboardDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      setIsLoading(true);
      try {
        const res = await getDashboardDetail(formatDate(selectedDate!));
        setDashboardData(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, [selectedDate]);

  return (
    <section>
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="w-full flex min-h-screen justify-center bg-[color:var(--color-gray-background)] pt-10 pb-30 px-5 sm:pt-18">
        <div className="w-full max-w-185 flex flex-col items-center gap-5">
          <Banner />
          <Calendar
            isCompact={true}
            selected={selectedDate}
            setSelected={setSelectedDate}
          />
          {isLoading ? (
            <>
              <MyScheduleSkeleton />
              <MyGroupSkeleton />
            </>
          ) : (
            <>
              <MyScheduleSection
                selectedDate={selectedDate!}
                schedules={dashboardData!.schedules}
              />
              <MyGroupSection groups={dashboardData!.groups.groupDetails} />
            </>
          )}
        </div>
      </div>
      <div className="block sm:hidden">
        <Footer />
      </div>
    </section>
  );
};
export default Dashboard;

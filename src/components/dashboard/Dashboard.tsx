import { useState } from "react";
import { Calendar } from "../feature/calendar/Calender";
import { Banner } from "./Banner";
import { MyScheduleSection } from "./MyScheduleSection";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { MyGroupSection } from "./MyGroupSection";
import {
  useDashboardGroups,
  useDashboardSchedules,
} from "@/lib/api/dashboardApi";
import { MyGroupSkeleton, MyScheduleSkeleton } from "./Skeleton";
import useAuthStore from "@/stores/authStores";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const { user } = useAuthStore();

  const { data: schedules, isPending: isScheduleLoading } =
    useDashboardSchedules(selectedDate!);
  const { data: groups, isPending: isGroupLoading } = useDashboardGroups();

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
          {isScheduleLoading ? (
            <MyScheduleSkeleton />
          ) : (
            <MyScheduleSection
              selectedDate={selectedDate!}
              schedules={schedules || []}
              userId={user!.id}
            />
          )}

          {isGroupLoading ? (
            <>
              <MyGroupSkeleton />
            </>
          ) : (
            <>
              <MyGroupSection groups={groups} />
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

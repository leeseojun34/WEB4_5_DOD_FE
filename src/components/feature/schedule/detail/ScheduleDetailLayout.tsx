import Header from "@/components/layout/Header";
import GroupHeader from "@/components/layout/GroupHeader";
import Footer from "@/components/layout/Footer";
import useMediaQuery from "../hooks/useMediaQuery";

interface ScheduleDetailLayoutProps {
  children: React.ReactNode;
  data: ScheduleDetailType;
  scheduleId: string;
  isLeader: boolean;
}

const ScheduleDetailLayout = ({
  children,
  data,
  scheduleId,
  isLeader,
}: ScheduleDetailLayoutProps) => {
  const isSE = useMediaQuery("(min-height: 667px)");

  return (
    <div
      className={`w-full bg-[color:var(--color-gray-background)] min-h-screen ${
        isSE && "pb-30"
      }`}
    >
      <div className="hidden sm:block">
        <Header type="blue" />
      </div>
      <GroupHeader
        name={data?.scheduleName}
        description={data?.description}
        count={data?.members.length}
        isLeader={isLeader}
        type="schedule"
        id={scheduleId}
      />
      <div className="min-w-[375px] w-full max-w-185 mx-auto pt-6 sm:pt-10">
        <div className="flex flex-col px-5 gap-4">{children}</div>
      </div>
      <div className="sm:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default ScheduleDetailLayout;

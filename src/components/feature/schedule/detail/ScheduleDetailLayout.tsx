import Header from "@/components/layout/Header";
import GroupHeader from "@/components/layout/GroupHeader";
import Footer from "@/components/layout/Footer";

interface ScheduleDetailLayoutProps {
  children: React.ReactNode;
  data: ScheduleDetailType;
}

const ScheduleDetailLayout = ({
  children,
  data,
}: ScheduleDetailLayoutProps) => {
  return (
    <div className="w-full bg-[color:var(--color-gray-background)] min-h-screen">
      <div className="hidden sm:block">
        <Header type="blue" />
      </div>
      <GroupHeader
        name={data.scheduleName}
        description={data.description}
        count={data.members.length}
        isLeader={true}
        type="schedule"
        id={String(data.eventId)}
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

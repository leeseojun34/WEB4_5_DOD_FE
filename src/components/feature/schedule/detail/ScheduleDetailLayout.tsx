import Header from "@/components/layout/Header";
import GroupHeader from "@/components/layout/GroupHeader";
import Footer from "@/components/layout/Footer";

interface ScheduleDetailLayoutProps {
  children: React.ReactNode;
}

const ScheduleDetailLayout = ({ children }: ScheduleDetailLayoutProps) => {
  return (
    <div className="w-full bg-[color:var(--color-gray-background)] min-h-screen">
      <div className="hidden sm:block">
        <Header type="blue" />
      </div>
      <GroupHeader
        groupName="대나무 행주"
        groupIntroduction="안녕하세요 대나무행주입니다람쥐"
        groupCount={6}
        clickToInvite={() => console.log("초대함")}
        icon="pen"
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

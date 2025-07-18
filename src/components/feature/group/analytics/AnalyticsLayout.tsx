import Header from "@/components/layout/Header";
import HeaderTop from "@/components/layout/HeaderTop";
import Footer from "@/components/layout/Footer";

interface AnalyticsLayoutProps {
  children: React.ReactNode;
}

const AnalyticsLayout = ({ children }: AnalyticsLayoutProps) => {
  return (
    <div className={`bg-[color:var(--color-primary-100)] w-full pb-25`}>
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="min-w-[375px] w-full max-w-185 mx-auto">
        <HeaderTop>그룹 통계</HeaderTop>
      </div>
      <div
        className={`min-w-[375px] w-full max-w-185 px-5 pt-25 sm:pt-40 min-h-screen flex flex-col gap-4 mx-auto`}
      >
        {children}
      </div>
      <div className="sm:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default AnalyticsLayout;

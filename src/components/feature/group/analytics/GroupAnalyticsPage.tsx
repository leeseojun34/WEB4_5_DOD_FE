import Header from "@/components/layout/Header";
import HeaderTop from "@/components/layout/HeaderTop";
import GroupAnalyticsSection from "./GroupAnalyticsSection";
import MemberParticipationItem from "./MemberParticipationItem";
import WeekdayFrequencyBarChart from "./WeekdayFrequencyBarChart";
import LocationFrequencyItem from "./LocationFrequencyItem";
import PlaceLegendSection from "./PlaceLegendSection";
import Footer from "@/components/layout/Footer";

const GroupAnalyticsPage = () => {
  return (
    <div className="bg-[color:var(--color-primary-100)] w-full pb-25">
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="min-w-[375px] w-full max-w-185 mx-auto ">
        <HeaderTop>그룹 통계</HeaderTop>
      </div>
      <div className="min-w-[375px] w-full max-w-185 px-5 pt-25 sm:pt-40 min-h-screen flex flex-col gap-4 mx-auto">
        <GroupAnalyticsSection color="blue" title="그룹원별 참여율">
          <MemberParticipationItem name="박준규" index={0} percentage={92} />
          <MemberParticipationItem name="현혜주" index={1} percentage={90} />
          <MemberParticipationItem name="박은서" index={2} percentage={88} />
          <MemberParticipationItem name="박상윤" index={3} percentage={48} />
          <MemberParticipationItem name="황수지" index={4} percentage={22} />
        </GroupAnalyticsSection>
        <GroupAnalyticsSection color="purple" title="요일별 모임 빈도">
          <WeekdayFrequencyBarChart
            weekdayData={{ 월: 3, 화: 5, 수: 2, 목: 4, 금: 1, 토: 6, 일: 9 }}
          />
        </GroupAnalyticsSection>
        <GroupAnalyticsSection color="red" title=" 장소별 모임 빈도">
          <div className="flex w-full justify-center gap-10">
            <div className="w-45 h-45">
              {/* 내림차순으로 정렬 후 전달 */}
              <LocationFrequencyItem locationFrequencyData={[9, 5, 2, 1]} />
            </div>
            <PlaceLegendSection
              locations={["강남역", "건대입구역", "서초역", "기타"]}
            />
          </div>
        </GroupAnalyticsSection>
      </div>
      <div className="sm:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default GroupAnalyticsPage
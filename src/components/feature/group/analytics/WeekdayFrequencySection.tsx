import GroupAnalyticsSection from "./GroupAnalyticsSection";
import WeekdayFrequencyBarChart from "./WeekdayFrequencyBarChart";

interface WeekdayFrequencySectionProps {
  weekdayData: { [key: string]: number };
}

const WeekdayFrequencySection = ({ weekdayData }: WeekdayFrequencySectionProps) => {
  return (
    <GroupAnalyticsSection color="purple" title="요일별 모임 빈도">
      <WeekdayFrequencyBarChart weekdayData={weekdayData} />
    </GroupAnalyticsSection>
  );
};

export default WeekdayFrequencySection;
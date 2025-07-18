import GroupAnalyticsSection from "./GroupAnalyticsSection";
import LocationFrequencyItem from "./LocationFrequencyItem";
import PlaceLegendSection from "./PlaceLegendSection";

interface LocationFrequencySectionProps {
  locations: string[];
  counts: number[];
}

const LocationFrequencySection = ({ locations, counts }: LocationFrequencySectionProps) => {
  return (
    <GroupAnalyticsSection color="red" title="장소별 모임 빈도">
      <div className="flex w-full justify-center gap-10">
        <div className="w-45 h-45">
          <LocationFrequencyItem locationFrequencyData={counts} />
        </div>
        <PlaceLegendSection locations={locations} />
      </div>
    </GroupAnalyticsSection>
  );
};

export default LocationFrequencySection;
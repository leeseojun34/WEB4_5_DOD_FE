import PlaceLegendItem from "./PlaceLegendItem";

const PlaceLegendSection = ({ locations }: { locations: string[] }) => {
  return (
    <div className="flex flex-col gap-1">
      {locations.map((location, i) => (
        <PlaceLegendItem location={location} index={i} key={i} />
      ))}
    </div>
  );
};

export default PlaceLegendSection;

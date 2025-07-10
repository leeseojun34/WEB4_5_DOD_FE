interface PlaceLegendItemProps {
  location: string;
  index: number;
}

const PlaceLegendItem = ({ location, index }: PlaceLegendItemProps) => {
  const COLORS = [
    "bg-[color:var(--color-purple)]",
    "bg-[color:var(--color-primary-400)]",
    "bg-[color:var(--color-red)]",
    "bg-[color:var(--color-gray)]",
  ];

  return (
    <div className="flex justify-start items-center gap-2">
      <div className={`w-2 h-2 ${COLORS[index]} rounded-[2px]`}></div>
      <div className="text-xs text-[color:var(--color-black)] font-semibold">{location}</div>
    </div>
  );
};

export default PlaceLegendItem;

type TitleColor = "blue" | "purple" | "red";

interface GroupAnalyticsSectionProps {
  color: TitleColor;
  title: string;
  children: React.ReactNode;
}

const GroupAnalyticsSection = ({
  color,
  title,
  children,
}: GroupAnalyticsSectionProps) => {
  const COLORS = {
    blue: "border-[color:var(--color-primary-400)]",
    purple: "border-[color:var(--color-purple)]",
    red: "border-[color:var(--color-red)]",
  };
  return (
    <div className="w-full bg-[color:var(--color-white)] rounded-[20px] p-6 flex flex-col">
      <div
        className={`w-full border-l-[5px] ${COLORS[color]} px-3 font-semibold text-base mb-4`}
      >
        {title}
      </div>
      {children}
    </div>
  );
};
export default GroupAnalyticsSection;

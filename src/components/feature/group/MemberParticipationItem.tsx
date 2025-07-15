interface MemberParticipationItemProps {
  index: number;
  name: string;
  percentage: number;
}

const MemberParticipationItem = ({
  index,
  name,
  percentage,
}: MemberParticipationItemProps) => {
  return (
    <div
      className={`flex justify-between px-5 py-3 bg-[color:var(--white)] rounded-sm text-sm font-semibold ${
        index === 0 && "border border-[color:var(--color-primary-400)]"
      }`}
    >
      <div className="min-w-8">{index + 1}위</div>
      <div>{name}</div>
      <div
        className={`
          min-w-10
          ${
            percentage >= 50
              ? "text-[color:var(--color-primary-400)]"
              : "text-[color:var(--color-red)]"
          }`}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default MemberParticipationItem;

interface MemberCountProps {
  count: number;
}

const MemberCount = ({ count }: MemberCountProps) => {
  return (
    <div className="text-xs text-[color:var(--color-gray)]">
      인원 <span>{count}</span>
    </div>
  );
};

export default MemberCount;

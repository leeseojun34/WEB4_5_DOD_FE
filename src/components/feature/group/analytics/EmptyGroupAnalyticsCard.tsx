const EmptyGroupAnalyticsCard = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <div className="font-bold text-[color:var(--color-primary-400)]">
        통계를 보려면 모임이 한 번 이상 필요해요!
      </div>
      <div className="leading-[26px] text-sm text-center">
        그룹 활동이 시작되면
        <br />
         참여율과 모임 패턴을 확인할 수 있어요 :)
      </div>
    </div>
  );
};

export default EmptyGroupAnalyticsCard;

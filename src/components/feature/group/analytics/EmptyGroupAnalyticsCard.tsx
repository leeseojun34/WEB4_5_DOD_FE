const EmptyGroupAnalyticsCard = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <div className="font-bold">통계를 보려면 모임이 한 번 이상 필요해요!</div>
      <div className="leading-[26px] text-sm text-center">
        참여율이나 요일/장소별 모임 패턴은
        <br />
        그룹 활동이 시작된 후부터 확인할 수 있어요 :)
      </div>
    </div>
  );
};

export default EmptyGroupAnalyticsCard;

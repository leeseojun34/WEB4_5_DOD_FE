const ScheduleDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <div>ScheduleDetail: {id}</div>;
};
export default ScheduleDetail;

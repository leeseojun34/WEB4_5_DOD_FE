const ScheduleTitleText = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-semibold mx-5">{title}</div>
        <div className="text-sm text-gray-500 mx-5">{description}</div>
      </div>
    </>
  );
};
export default ScheduleTitleText;

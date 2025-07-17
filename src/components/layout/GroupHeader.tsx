import GroupHeaderTop from "./GroupHeaderTop";
import GroupHeaderContent from "./GroupHeaderContent";

type GroupHeaderProps = {
  name: string;
  description: string;
  count: number;
  isLeader: boolean;
  type: "schedule" | "group";
  id?: string;
};

const GroupHeader = ({
  name,
  description,
  count,
  isLeader,
  type,
  id = "0",
}: GroupHeaderProps) => {
  return (
    <>
      <div className="w-full bg-[color:var(--color-primary-400)] flex justify-center items-center min-w-[375px]">
        <div className="flex flex-col w-full max-w-[740px]  items-center justify-center gap-4 pb-5 pt-10 sm:pt-19 px-5">
          <GroupHeaderTop
            name={name}
            id={id}
            isLeader={isLeader}
            type={type}
          />
          <GroupHeaderContent
            description={description}
            count={count}
            id={id}
            isLeader={isLeader}
            type={type}
          />
        </div>
      </div>
    </>
  );
};
export default GroupHeader;

import GroupHeaderTop from "./GroupHeaderTop";
import GroupHeaderContent from "./GroupHeaderContent";

type GroupHeaderProps = {
  groupName: string;
  groupIntroduction: string;
  groupCount: number;
  isLeader: boolean;
};

const GroupHeader = ({
  groupName,
  groupIntroduction,
  groupCount,
  isLeader,
}: GroupHeaderProps) => {
  const groupId = "1";
  return (
    <>
      <div className="w-full bg-[color:var(--color-primary-400)] flex justify-center items-center min-w-[375px]">
        <div className="flex flex-col w-full max-w-[740px]  items-center justify-center gap-4 pb-5 pt-10 sm:pt-19 px-5">
          <GroupHeaderTop
            groupName={groupName}
            groupId={groupId}
            isLeader={isLeader}
          />
          <GroupHeaderContent
            groupIntroduction={groupIntroduction}
            groupCount={groupCount}
            groupId={groupId}
          />
        </div>
      </div>
    </>
  );
};
export default GroupHeader;

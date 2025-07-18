import Link from "next/link";
import { MyGroupItem } from "./MyGroupItem";
import { DashboardGroupType } from "@/lib/api/dashboardApi";

interface MyGroupSectionProps {
  groups: DashboardGroupType[];
}

export const MyGroupSection = ({ groups }: MyGroupSectionProps) => {
  return (
    <>
      <div className="bg-[color:var(--color-white)] p-5 rounded-[20px] w-full gap-2 flex flex-col">
        <div className="flex justify-between">
          <p className="font-semibold text-base text-[color:var(--color-black)]">
            나의 모임
          </p>
        </div>
        {groups.length > 0 ? (
          <>
            {groups.map((group) => (
              <Link href={`/group/${group.groupId}`} key={group.groupId}>
                <MyGroupItem group={group} />
              </Link>
            ))}
          </>
        ) : (
          <EmptyGroup />
        )}
      </div>
    </>
  );
};

const EmptyGroup = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 py-4">
      <div className="text-center text-sm text-[color:var(--color-gray-placeholder)] leading-6">
        내가 가입된 모임이 없어요.
      </div>
    </div>
  );
};

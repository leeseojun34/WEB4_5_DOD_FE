import Link from "next/link";
import { MyGroupItem } from "./MyGroupItem";
import { DashboardGroupType } from "@/lib/api/dashboardApi";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface MyGroupSectionProps {
  groups: DashboardGroupType[];
}

export const MyGroupSection = ({ groups }: MyGroupSectionProps) => {
  return (
    <>
      <div className="bg-[color:var(--color-white)] p-6 rounded-[20px] w-full gap-2 flex flex-col  min-w-[335px]">
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
          <div className="flex flex-1 justify-center items-center py-4">
            <EmptyGroup />
          </div>
        )}
      </div>
    </>
  );
};

const EmptyGroup = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center gap-3 py-4">
      <div className="text-center text-sm text-[color:var(--color-gray-placeholder)] leading-6">
        가입된 그룹이 없어요 <br /> 새로운 그룹을 만들어 볼까요?
      </div>
      <button
        className="flex text-[color:var(--color-primary-400)] gap-[2px] justify-center items-center cursor-pointer"
        onClick={() => router.push("/group/create")}
      >
        <span className="hover:font-medium text-xs">그룹 만들러 가기</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
};

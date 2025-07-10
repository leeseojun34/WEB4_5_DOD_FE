import { MyGroupItem } from "./MyGroupItem";

export const MyGroupSection = () => {
  return (
    <>
      <div className="bg-[color:var(--color-white)] p-5 rounded-xl w-full gap-2 flex flex-col">
        <div className="flex justify-between">
          <p className="font-semibold text-base text-[color:var(--color-black)]">
            나의 모임
          </p>
        </div>
        <MyGroupItem />
        <MyGroupItem />
        {/* <EmptyGroup /> */}
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

export const MyScheduleSkeleton = () => {
  return (
    <div className="bg-[color:var(--color-white)] p-6 rounded-[20px] w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-base text-[color:var(--color-black)]">
          나의 일정
        </p>
        <div>
          <button className="hover:font-medium text-xs text-[color:var(--color-gray-placeholder)] cursor-pointer">
            일정 모두 보기
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {[...Array(2)].map((_, idx) => (
          <div
            key={idx}
            className="flex gap-5 w-full items-center min-w-50 max-w-185 py-2 pr-2 rounded-md"
          >
            <div className="flex items-center justify-center w-[72px] h-[50px] bg-gray-100 rounded-lg animate-pulse" />
            <div className="flex-1 flex flex-col space-y-1 w-full">
              <div className="w-1/2 h-4 bg-gray-100 rounded animate-pulse" />
              <div className="w-1/3 h-3 bg-gray-100 rounded animate-pulse" />
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-100 rounded-full animate-pulse" />
                <div className="w-24 h-3 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const MyGroupSkeleton = () => {
  return (
    <div className="bg-[color:var(--color-white)] p-6 rounded-[20px] w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-base text-[color:var(--color-black)]">
          나의 모임
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {[...Array(2)].map((_, idx) => (
          <div
            key={idx}
            className="flex gap-5 items-center min-w-50 max-w-185 py-2 pr-2 rounded-md"
          >
            <div className="flex items-center justify-center w-[72px] h-[50px] bg-gray-100 rounded-lg animate-pulse" />

            <div className="flex-1 flex flex-col justify-center gap-2 w-full">
              <div className="flex items-center justify-between w-full">
                <div className="w-[130px] sm:w-[380px] h-4 bg-gray-100 rounded animate-pulse" />
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gray-100 rounded-full animate-pulse" />
                  <div className="w-4 h-3 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
              <div className="w-[150px] sm:w-[380px] h-3 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const UserScheduleListSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {[...Array(3)].map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse w-full h-[100px] bg-[color:var(--color-gray-light)] rounded-xl"
        ></div>
      ))}
    </div>
  );
};

export const ScheduleCardSkeleton = () => {
  return (
    <div
      className="min-w-[335px] max-w-185 w-full h-auto p-4 rounded-lg bg-white animate-pulse"
      style={{ boxShadow: "var(--shadow-common)" }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="w-20 h-4 bg-gray-200 rounded" />
            <div className="w-12 h-4 bg-primary-200 rounded" />
          </div>
        </div>
        <div className="w-36 h-4 bg-gray-200 rounded" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-10 h-5 bg-gray-200 rounded-sm" />
          ))}
        </div>
      </div>
    </div>
  );
};

export const OptionBoxSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="border border-gray-200 rounded-lg  px-4 py-3 flex flex-col gap-2 min-w-[335px] max-w-185 w-full">
        <div className="flex gap-3">
          <div className="w-24 h-4 bg-gray-200 rounded" />
          <div className="w-12 h-4 bg-gray-200 rounded" />
        </div>

        <div className="w-36 h-4 bg-gray-200 rounded" />

        <div className="flex gap-1 mt-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-10 h-5 bg-gray-200 rounded-sm" />
          ))}
        </div>
      </div>
    </div>
  );
};

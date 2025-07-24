const WorkspaceSkeletonItem = () => {
  return (
    <>
      <div className="min-w-[335px] max-w-185 w-full h-auto p-4 rounded-lg bg-[color:var(--color-white)] shadow-[var(--shadow-common)] gap-3 flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 bg-[color:var(--color-gray-background)] w-50 animate-pulse">
            <div className="w-5 h-5 relative flex-shrink-0"></div>
            <span className="text-sm"></span>
          </div>
        </div>
        <div className="bg-[color:var(--color-gray-background)] rounded-sm px-2 py-1 text-xs h-6 animate-pulse">
          <div className="block max-w-full"></div>
        </div>
      </div>
    </>
  );
};

export default WorkspaceSkeletonItem;

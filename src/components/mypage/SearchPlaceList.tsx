function SearchPlaceList({
  stationName,
  stationAddress,
}: {
  stationName: string;
  stationAddress: string;
}) {
  return (
    <div className="w-full flex flex-col gap-2 rounded-lg bg-[var(--color-white)] hover:bg-[var(--color-muted)] px-6 py-2.5">
      <div className="text-[var(--color-black)] text-sm font-medium">
        {stationName}
      </div>
      <div className="text-[var(--color-gray-placeholder)] text-xs font-medium">
        {stationAddress}
      </div>
    </div>
  );
}
export default SearchPlaceList;

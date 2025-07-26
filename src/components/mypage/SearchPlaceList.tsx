import React from "react";

interface SearchPlaceListProps {
  stationName: string;
  stationAddress: string;
  onClick: () => void;
  isSelected: boolean;
}

function SearchPlaceList({
  stationName,
  stationAddress,
  onClick,
  isSelected,
}: SearchPlaceListProps) {
  return (
    <div
      onClick={onClick}
      className={`
        w-full flex flex-col gap-2 rounded-lg 
        px-2 py-2.5 cursor-pointer
        ${
          isSelected
            ? "bg-[var(--color-primary-100)]"
            : "bg-[var(--color-white)] hover:bg-[var(--color-muted)]"
        }
      `}>
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

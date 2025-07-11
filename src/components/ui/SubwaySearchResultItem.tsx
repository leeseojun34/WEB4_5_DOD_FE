import { kakaoSearch } from "@/types/kakaoSearch";

export interface SubwaySearchResultItemProps {
  station: kakaoSearch;
  keyword?: string;
  onClick: (data: { station: kakaoSearch }) => void;
}

const highlightKeyword = (text: string, keyword: string) => {
  if (!keyword) return text;
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  return text.replace(
    regex,
    '<span class="text-[var(--color-primary-400)] font-semibold">$1</span>'
  );
};

const SubwaySearchResultItem: React.FC<SubwaySearchResultItemProps> = ({
  station,
  onClick,
  keyword,
}) => {
  const lastCategory = station.category_name?.split(">").pop()?.trim() || "";

  return (
    <button
      className="w-full flex flex-col items-start rounded-lg hover:bg-[var(--color-muted)] transition duration-300 py-1.5 px-7.5 gap-2.5
    "
      onClick={() => onClick({ station })}
    >
      <div className="flex w-full items-center">
        <span
          className="text-sm"
          dangerouslySetInnerHTML={{
            __html: highlightKeyword(station.place_name, keyword ?? ""),
          }}
        />
        <span className="text-xs text-[var(--color-gray)] ml-2.5">
          {lastCategory}
        </span>
      </div>
      <span className="text-xs">{station.road_address_name}</span>
    </button>
  );
};

export default SubwaySearchResultItem;

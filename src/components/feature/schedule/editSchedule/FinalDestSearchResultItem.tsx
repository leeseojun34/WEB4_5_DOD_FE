import { kakaoSearch } from "@/types/kakaoSearch";

interface FinalDestSearchResultItemProps {
  destination: kakaoSearch;
  keyword?: string;
  onClick: (data: { destination: kakaoSearch }) => void;
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

const FinalDestSearchResultItem = ({
  destination,
  onClick,
  keyword,
}: FinalDestSearchResultItemProps) => {
  const categoryParts =
    destination.category_name?.split(">").map((part) => part.trim()) || [];
  const category = categoryParts[1] || "";
  return (
    <>
      <button
        className="w-full flex flex-col items-start rounded-lg hover:bg-[var(--color-muted)] transition duration-300 py-2 px-3 gap-2.5
    "
        onClick={() => onClick({ destination })}
      >
        <div className="flex w-full items-center">
          <span
            className="text-sm"
            dangerouslySetInnerHTML={{
              __html: highlightKeyword(destination.place_name, keyword ?? ""),
            }}
          />
          <span className="text-xs text-[var(--color-gray)] ml-2.5">
            {category}
          </span>
        </div>
        <span className="text-xs">{destination.road_address_name}</span>
      </button>
    </>
  );
};

export default FinalDestSearchResultItem;

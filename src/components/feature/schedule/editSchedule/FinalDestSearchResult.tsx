import { kakaoSearch } from "@/types/kakaoSearch";
import FinalDestSearchResultItem from "./FinalDestSearchResultItem";

interface FinalDestSearchResultProps {
  searchResults: kakaoSearch[];
  onSelect: (data: { destination: kakaoSearch }) => void;
  keyword: string;
}
const FinalDestSearchResult = ({
  searchResults,
  onSelect,
  keyword,
}: FinalDestSearchResultProps) => {
  return searchResults.length ? (
    <div className="w-full flex flex-col gap-3 py-1">
      <div className="max-h-82 overflow-y-auto">
        {searchResults.map((searchResult) => (
          <FinalDestSearchResultItem
            key={searchResult.id}
            destination={searchResult}
            onClick={onSelect}
            keyword={keyword}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className="pt-5 h-10 flex justify-center items-center text-xs text-[color:var(--color-gray)]">
      검색 결과가 없습니다.
    </div>
  );
};

export default FinalDestSearchResult;

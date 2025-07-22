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
  return (
    <div className="w-full flex flex-col gap-3 py-4">
      <div className="max-h-50 overflow-y-auto">
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
  );
};

export default FinalDestSearchResult;

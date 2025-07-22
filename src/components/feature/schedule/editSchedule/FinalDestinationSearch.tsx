import searchDestination from "@/app/utils/searchDestination";
import Input from "@/components/ui/Input";
import { kakaoSearch } from "@/types/kakaoSearch";
import { Search } from "lucide-react";
import { ChangeEvent, useState } from "react";
import FinalDestSearchResult from "./FinalDestSearchResult";

const FinalDestinationSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<kakaoSearch[]>([]);
  const [selectedDestination, setSelectedDestination] =
    useState<kakaoSearch | null>(null);

  const selectHandler = ({ destination }: { destination: kakaoSearch }) => {
    setSelectedDestination(destination);
  };

  const searchHandler = async () => {
    if (!inputValue.trim()) return;
    try {
      const data = await searchDestination(inputValue);
      setSearchResults(data.documents);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full gap-2">
      <Input
        label="모임 장소"
        icon={
          <Search
            className="w-4 h-4 text-[color:var(--color-gray-placeholder)]"
            onClick={searchHandler}
          />
        }
        fullWidth={true}
        placeholder="장소를 검색하세요"
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") searchHandler();
        }}
      />

      <div>{selectedDestination?.place_name.split(" ")[0]}</div>

      <FinalDestSearchResult
        searchResults={searchResults}
        onSelect={selectHandler}
        keyword={inputValue}
      />
    </div>
  );
};

export default FinalDestinationSearch;

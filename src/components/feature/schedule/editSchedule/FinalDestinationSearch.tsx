import searchDestination from "@/app/utils/searchDestination";
import Input from "@/components/ui/Input";
import { kakaoSearch } from "@/types/kakaoSearch";
import { Search } from "lucide-react";
import { ChangeEvent, useState } from "react";
import FinalDestSearchResult from "./FinalDestSearchResult";

interface FinalDestinationSearchProps {
  destination: string;
  setDestination: (destination: string) => void;
  setDestinationLatitude: (destinationLatitude: number) => void;
  setDestinationLongitude: (destinationLongitude: number) => void;
}

const FinalDestinationSearch = ({
  destination,
  setDestination,
  setDestinationLatitude,
  setDestinationLongitude,
}: FinalDestinationSearchProps) => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<kakaoSearch[]>([]);

  const selectHandler = ({ destination }: { destination: kakaoSearch }) => {
    setSearchResults([destination]);
    setInputValue(destination.place_name);
    setDestination(destination.place_name);
    setDestinationLongitude(Number(destination.x));
    setDestinationLatitude(Number(destination.y));
  };

  const handleSearchDestination = async () => {
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
            onClick={handleSearchDestination}
          />
        }
        fullWidth={true}
        placeholder="장소를 검색하세요"
        value={inputValue || destination}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") handleSearchDestination();
        }}
      />

      {inputValue && (
        <FinalDestSearchResult
          searchResults={searchResults}
          onSelect={selectHandler}
          keyword={inputValue}
        />
      )}
    </div>
  );
};

export default FinalDestinationSearch;

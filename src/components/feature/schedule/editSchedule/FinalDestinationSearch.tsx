import searchDestination from "@/app/utils/searchDestination";
import Input from "@/components/ui/Input";
import { kakaoSearch } from "@/types/kakaoSearch";
import { Search } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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
  const [inputValue, setInputValue] = useState(destination ?? "");
  const [searchResults, setSearchResults] = useState<kakaoSearch[]>([]);
  const [showResults, setShowResults] = useState(false);
  const isSelectedRef = useRef(false);

  const selectHandler = ({ destination }: { destination: kakaoSearch }) => {
    isSelectedRef.current = true;
    setShowResults(false);
    setInputValue(destination.place_name);
    setDestination(destination.place_name);
    setDestinationLongitude(Number(destination.x));
    setDestinationLatitude(Number(destination.y));
  };

  useEffect(() => {
    if (isSelectedRef.current) {
      isSelectedRef.current = false;
      return;
    }

    if (!inputValue.trim()) {
      setShowResults(false);
      setSearchResults([]);
      return;
    }

    const debounceTimer = setTimeout(async () => {
      try {
        const data = await searchDestination(inputValue);
        setSearchResults(data.documents);
        setShowResults(true);
      } catch (e) {
        console.error(e);
      }
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [inputValue]);

  return (
    <div className="w-full gap-2">
      <Input
        label="모임 장소"
        icon={
          <Search className="w-4 h-4 text-[color:var(--color-gray-placeholder)]" />
        }
        fullWidth={true}
        placeholder="장소를 검색하세요"
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
          if (e.target.value === "") {
            setShowResults(false);
          }
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      />

      {showResults && (
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

import { Search, X } from "lucide-react";
import BottomSheet from "../ui/BottomSheet";
import Input from "../ui/Input";
import { Button } from "../ui/Button";
import SearchPlaceList from "./SearchPlaceList";
import React, { useState } from "react";
import { kakaoSearch } from "@/types/kakaoSearch";
import { searchSubwayStation } from "@/app/utils/searchSubwayStation";

const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY as string;

type StationSheetType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSave: (station: kakaoSearch) => void;
};

const StationSheet = ({ isOpen, setIsOpen, onSave }: StationSheetType) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<kakaoSearch[]>([]);
  const [selectedStation, setSelectedStation] = useState<kakaoSearch | null>(
    null
  );
  const [hasSearched, setHasSearched] = useState(false);
  const snapPoints = [0.8, 0.7, 0.5];

  const saveHandler = () => {
    if (selectedStation) {
      onSave(selectedStation);
    }
    setQuery("");
    setResults([]);
    setHasSearched(false);
    setSelectedStation(null);
    setIsOpen(false);
  };

  return (
    <>
      <BottomSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        snapPoints={snapPoints}
        initialSnap={1}
      >
        {(snapTo) => {
          const searchHandler = async () => {
            if (!query.trim()) return;
            setHasSearched(true);
            try {
              const data = await searchSubwayStation(query, REST_API_KEY);
              setResults(data.documents);
              if (data.documents.length > 0) {
                snapTo?.(0);
              }
            } catch {
              console.error("검색 실패");
            }
          };

          const cancelHandler = () => {
            snapTo?.(1);
            setIsOpen(false);
            setQuery("");
            setResults([]);
            setHasSearched(false);
            setSelectedStation(null);
          };

          const needScroll = results.length > 4;

          return (
            <div className="w-full flex flex-col px-5 gap-8 pb-12">
              <div className="flex justify-between items-center">
                <X className="invisible" />
                <span className="text-base font-medium">역찾기</span>
                <X
                  size={20}
                  onClick={cancelHandler}
                  className="cursor-pointer"
                />
              </div>
              <div className="w-full flex flex-col flex-1 min-h-0 gap-4 max-w-[700px] mx-auto">
                <div className="w-full h-12">
                  <Input
                    value={query}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setQuery(e.currentTarget.value)
                    }
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                      e.key === "Enter" && searchHandler()
                    }
                    icon={
                      <button
                        disabled={query.trim() === ""}
                        onClick={searchHandler}
                        className={
                          query.trim() === ""
                            ? "cursor-not-allowed opacity-50"
                            : ""
                        }
                      >
                        <Search className="w-4 h-4" />
                      </button>
                    }
                    placeholder="가까운 지하철을 검색해주세요."
                    fullWidth
                    className="h-full flex items-center px-4"
                  />
                </div>
                <div className="flex flex-col h-[323px] overflow-y-auto gap-2 bg-white rounded-lg py-0.5 px-2 w-full">
                  <div
                    className={`overflow-y-auto ${
                      needScroll
                        ? // iPhone SE 등 640px 미만: 2개 높이만(예: 2 * 56px = 112px)
                          "h-80"
                        : ""
                    }`}
                  >
                    {results.map((station, idx) => (
                      <SearchPlaceList
                        key={idx}
                        stationName={station.place_name}
                        stationAddress={station.road_address_name}
                        onClick={() => setSelectedStation(station)}
                        isSelected={
                          selectedStation?.place_name === station.place_name
                        }
                      />
                    ))}
                    {hasSearched && results.length === 0 && (
                      <div className="w-full text-center text-[var(--color-gray-placeholder)] text-xs font-light py-4">
                        해당 역 검색 내용이 없습니다.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </BottomSheet>

      {isOpen && (
        <div className="fixed bottom-9 left-0 right-0 px-5 z-[99999]">
          <div className="min-w-[335px] w-full max-w-185 mx-auto flex justify-center items-center">
            <Button
              state={selectedStation ? "default" : "disabled"}
              onClick={saveHandler}
            >
              저장하기
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default StationSheet;

"use client";

import BottomSheet from "@/components/ui/BottomSheet";
import Input from "@/components/ui/Input";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import SubwaySearchResultList from "@/components/ui/SubwaySearchResultList";
import { searchSubwayStation } from "@/app/utils/searchSubwayStation";
import { kakaoSearch } from "@/types/kakaoSearch";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";

const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY as string;

interface SubwaySearchProps {
  onSelectStation: (station: kakaoSearch) => void;
}

const SubwaySearch = ({ onSelectStation }: SubwaySearchProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<kakaoSearch[]>([]);
  const [selectedStation, setSelectedStation] = useState<kakaoSearch | null>(
    null
  );

  //쿼리초기화, 검색 결과 초기화 추가 필요

  const selectHandler = ({ station }: { station: kakaoSearch }) => {
    //console.log("선택된 역:", station);
    setSelectedStation(station);
    onSelectStation(station);
  };

  const searchHandler = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await searchSubwayStation(query, REST_API_KEY);
      setResults(data.documents);
    } catch (e) {
      console.log("fail", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <BottomSheet isOpen={isOpen} snapPoints={544} setIsOpen={setIsOpen}>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-[700px] pb-8 flex flex-col mx-auto">
          {!selectedStation ? (
            <>
              <h1 className="text-base font-semibold py-8 text-[var(--color-black)] text-center">
                출발할 위치를 입력해주세요
              </h1>
              <div className="flex flex-col w-full min-h-41 gap-4">
                <Input
                  icon={<Search className="w-4 h-4" onClick={searchHandler} />}
                  placeholder="출발지 검색"
                  value={query}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuery(e.target.value)
                  }
                  fullWidth={true}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") searchHandler();
                  }}
                />
                <SubwaySearchResultList
                  results={results}
                  onSelect={selectHandler}
                  keyword={query}
                />
                {loading && <div className="text-center py-2">검색 중</div>}
              </div>
            </>
          ) : (
            <div className="flex flex-col w-full items-center py-7 justify-center gap-4">
              <div className="flex w-full justify-between">
                <div className="flex flex-col">
                  <h1 className="text-base font-semibold text-[var(--color-black)] ">
                    {selectedStation.place_name}
                  </h1>
                  <p className="text-xs text-gray-500">
                    {selectedStation.road_address_name}
                  </p>
                </div>

                <X
                  className="w-6 h-6 text-[var(--color-black)] cursor-pointer"
                  onClick={() => setSelectedStation(null)}
                />
              </div>
            </div>
          )}
          <div className="mt-auto w-full gap-7">
            <Button
              state={selectedStation ? "default" : "disabled"}
              className="w-full"
            >
              다음
            </Button>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
};
export default SubwaySearch;

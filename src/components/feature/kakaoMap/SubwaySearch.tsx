"use client";

import BottomSheet from "@/components/ui/BottomSheet";
import Input from "@/components/ui/Input";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import SubwaySearchResultList from "@/components/ui/SubwaySearchResultList";
import { searchSubwayStation } from "@/app/utils/searchSubwayStation";
import { kakaoSearch } from "@/types/kakaoSearch";

const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY as string;

const SubwaySearch = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<kakaoSearch[]>([]);

  const selectHandler = ({ station }: { station: kakaoSearch }) => {
    console.log("선택된 역:", station);
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
    <>
      <BottomSheet isOpen={isOpen} snapPoints={375} setIsOpen={setIsOpen}>
        <div className="w-full px-5.5 pb-8 flex flex-col items-center justify-center">
          <h1 className="text-base font-semibold py-8 text-[var(--color-black)]">
            출발할 위치를 입력해주세요
          </h1>
          <div className="flex flex-col w-full gap-4">
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
        </div>
      </BottomSheet>
    </>
  );
};
export default SubwaySearch;

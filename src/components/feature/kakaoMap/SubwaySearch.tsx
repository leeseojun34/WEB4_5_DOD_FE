"use client";

import Input from "@/components/ui/Input";
import { Search } from "lucide-react";
import SubwaySearchResultList from "@/components/ui/SubwaySearchResultList";
import { searchSubwayStation } from "@/app/utils/searchSubwayStation";
import { kakaoSearch } from "@/types/kakaoSearch";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useCreateDepartLocation,
  useFavoriteLocation,
} from "@/lib/api/ElectionApi";
import ToastWell from "@/components/ui/ToastWell";

const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY as string;

interface SubwaySearchProps {
  onSelectStation: (station: kakaoSearch) => void;
  snapTo?: (i: number) => void;
  scheduleId: string;
  userId: string;
}

const SubwaySearch = ({
  onSelectStation,
  snapTo,
  scheduleId,
}: SubwaySearchProps) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<kakaoSearch[]>([]);
  const [selectedStation, setSelectedStation] = useState<kakaoSearch | null>(
    null
  );
  const route = useRouter();
  const createDepart = useCreateDepartLocation();
  const { refetch: fetchFavorites } = useFavoriteLocation();

  const selectHandler = ({ station }: { station: kakaoSearch }) => {
    setSelectedStation(station);
    onSelectStation(station);
    if (snapTo) snapTo(2);
    console.log(station);
  };

  const searchHandler = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await searchSubwayStation(query, REST_API_KEY);
      setResults(data.documents);
      if (snapTo) snapTo(0);
    } catch (e) {
      console.log("fail", e);
    }
    setLoading(false);
  };

  const resetHandler = () => {
    setSelectedStation(null);
    setQuery("");
    setResults([]);
    if (snapTo) snapTo(1);
  };

  const favoriteSelectHandler = async () => {
    try {
      const { data } = await fetchFavorites();

      if (!data || data.length === 0) {
        ToastWell("😣", "즐겨찾는 장소가 없습니다.");
        return;
      }

      const favorite = data[0];

      const station: kakaoSearch = {
        id: favorite.id,
        place_name: favorite.stationName,
        category_name: "",
        category_group_name: "",
        road_address_name: favorite.roadAddressName ?? "",
        x: String(favorite.longitude),
        y: String(favorite.latitude),
      };

      selectHandler({ station });
    } catch (err) {
      console.error("즐겨찾기 불러오기 실패", err);
      ToastWell("😣", "문제가 발생했어요.");
    }
  };

  //console.log(selectedStation);

  return (
    <div className="w-full flex flex-col items-center justify-center px-5">
      <div className="w-full max-w-[700px] flex flex-col mx-auto">
        {!selectedStation ? (
          <>
            <h1 className="text-base font-semibold py-8 text-[var(--color-black)] text-center">
              출발할 위치를 입력해주세요
            </h1>
            <div className="flex flex-1 flex-col w-full">
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
              <Button
                className="w-full justify-center"
                onClick={favoriteSelectHandler}
              >
                즐겨찾는 장소 불러오기
              </Button>
              {loading && <div className="text-center py-2">검색 중</div>}
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col w-full items-center py-7 justify-center gap-4 px-2">
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
                onClick={resetHandler}
              />
            </div>
          </div>
        )}
      </div>
      <div className="w-full sticky bottom-0 left-0 bg-white py-4 flex justify-center z-50">
        <Button
          state={selectedStation ? "default" : "disabled"}
          className="w-full justify-center"
          onClick={() => {
            if (!selectedStation) return;
            const trimmedPlaceName = selectedStation.place_name.split(" ")[0];
            const payload = {
              //memberId: userId,
              departLocationName: trimmedPlaceName,
              latitude: Number(selectedStation.y),
              longitude: Number(selectedStation.x),
            };
            console.log(payload);
            createDepart.mutate(
              {
                scheduleId,
                location: payload,
              },
              {
                onSuccess: () => {
                  route.push(`/schedule/${scheduleId}/election/wait`);
                },
                onError: (err) => {
                  console.error("출발지 등록 실패", err);
                },
              }
            );
          }}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default SubwaySearch;

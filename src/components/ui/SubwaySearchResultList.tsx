import SubwaySearchResultItem from "./SubwaySearchResultItem";
import { kakaoSearch } from "@/types/kakaoSearch";

interface SubwaySearchResultListProps {
  results: kakaoSearch[];
  onSelect: (data: { station: kakaoSearch }) => void;
  keyword?: string;
}

const SubwaySearchResultList: React.FC<SubwaySearchResultListProps> = ({
  results,
  onSelect,
  keyword,
}) => {
  const needScroll = results.length > 4;
  return (
    <div className="flex flex-col gap-3.5">
      <div className={needScroll ? "max-h-[232px] overflow-y-auto" : ""}>
        {results.map((station) => (
          <SubwaySearchResultItem
            key={station.id}
            station={station}
            onClick={onSelect}
            keyword={keyword}
          />
        ))}
      </div>
    </div>
  );
};
export default SubwaySearchResultList;

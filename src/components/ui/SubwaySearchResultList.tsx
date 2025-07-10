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
  return (
    <div className="flex flex-col gap-3.5">
      {results.map((station) => (
        <SubwaySearchResultItem
          key={station.id}
          station={station}
          onClick={onSelect}
          keyword={keyword}
        />
      ))}
    </div>
  );
};
export default SubwaySearchResultList;

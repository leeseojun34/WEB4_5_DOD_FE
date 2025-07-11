import { MapPin, Pen } from "lucide-react";

interface MeetingLocationProps {
  location?: string;
  specificLocation?: string;
}

const MeetingLocation = ({
  location,
  specificLocation,
}: MeetingLocationProps) => {
  return (
    <div className="bg-[color:var(--color-white)] px-5 py-4 gap-4 rounded-lg flex flex-col shadow-[var(--shadow-common)]">
      <div className="flex w-full justify-between items-center">
        <div className="flex gap-4 items-center">
          <div>
            <MapPin className="w-3 h-3 text-[color:var(--color-black)]" />
          </div>
          <div className="text-[color:var(--color-primary-300)] text-xs">
            온라인 회의장
          </div>
        </div>
        <div>
          <Pen className="w-3 h-3 text-[color:var(--color-gray)]" />
        </div>
      </div>
      {!location && !specificLocation && (
        <div className="flex w-full justify-center items-center py-4 text-xs text-[color:var(--color-gray)]">
          등록된 모임장소가 없습니다.
        </div>
      )}
      {location && specificLocation && (
        <div className="flex flex-col w-full gap-3">
          <div className="flex gap-4 items-center justify-between">
            <div className="text-xs text-[color:var(--color-gray)] font-medium">
              모임 장소
            </div>
            <div className="text-[color:var(--color-black)] text-sm">
              {specificLocation}
            </div>
          </div>
          <div className="flex gap-4 items-center justify-between">
            <div className="text-xs text-[color:var(--color-gray)] font-medium">
              중간 장소 (역)
            </div>
            <div className="text-[color:var(--color-black)] text-sm">
              {location}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingLocation;

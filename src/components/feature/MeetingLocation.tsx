import { MapPin, Pen } from "lucide-react";

interface MeetingLocationProps {
  location?: string;
  specificLocation?: string;
  isLocationEditOpen?: boolean;
  setIsLocationEditOpen?: (open: boolean) => void;
  isMaster: boolean;
}

const MeetingLocation = ({
  location,
  specificLocation,
  setIsLocationEditOpen,
  isMaster,
}: MeetingLocationProps) => {
  return (
    <div className="bg-[color:var(--color-white)] px-5 py-4 gap-4 rounded-lg flex flex-col shadow-[var(--shadow-common)]">
      <div className="flex w-full justify-between items-center">
        <div className="flex gap-4 items-center">
          <div>
            <MapPin className="w-3 h-3 text-[color:var(--color-black)]" />
          </div>
          <div className="text-[color:var(--color-primary-300)] text-xs">
            모임 장소
          </div>
        </div>
        {isMaster && (
          <div onClick={() => setIsLocationEditOpen?.(true)}>
            <Pen className="w-3 h-3 text-[color:var(--color-gray)] cursor-pointer" />
          </div>
        )}
      </div>
      {!location && !specificLocation ? (
        <div className="flex w-full justify-center items-center py-4 text-xs text-[color:var(--color-gray)] pb-8">
          등록된 모임장소가 없습니다.
        </div>
      ) : (
        <div className="flex flex-col w-full gap-3">
          <div className="flex gap-4 items-center justify-between">
            <div className="text-xs text-[color:var(--color-gray)] font-medium">
              모임 장소
            </div>
            <div className=" text-sm">
              {specificLocation ? (
                <p className="text-[color:var(--color-black)]">
                  {specificLocation}
                </p>
              ) : (
                <p className="text-[color:var(--color-gray-placeholder)] font-extralight">
                  미지정
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4 items-center justify-between">
            <div className="text-xs text-[color:var(--color-gray)] font-medium">
              중간 장소 (역)
            </div>
            <div className="text-[color:var(--color-gray-placeholder)] text-sm">
              {location ? (
                <p className="text-[color:var(--color-black)]">{location}</p>
              ) : (
                <p className="text-[color:var(--color-gray-placeholder)] font-extralight">
                  미지정
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingLocation;

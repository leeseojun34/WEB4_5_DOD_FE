import BottomSheet from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ShareButton from "@/components/ui/ShareButton";
import { useState } from "react";
import BottomSheetHeader from "@/components/layout/BottomSheetHeader";
import { useRouter } from "next/navigation";
import FinalDestinationSearch from "./FinalDestinationSearch";
import { useUpdateScheduleInfo } from "@/lib/api/scheduleApi";

interface LocationEditBottomSheetProps {
  location?: string;
  specificLocation?: string;
  specificLatitude: number;
  specificLongitude: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  scheduleId: string;
}

const LocationEditBottomSheet = ({
  location,
  specificLocation,
  specificLatitude,
  specificLongitude,
  isOpen,
  setIsOpen,
  scheduleId,
}: LocationEditBottomSheetProps) => {
  const router = useRouter();
  const snapPoints = [0.95, 0.9, 0.8];
  const { mutate: updateScheduleInfo } = useUpdateScheduleInfo();

  const [destination, setDestination] = useState(specificLocation ?? "");
  const [destinationLatitude, setDestinationLatitude] = useState(
    specificLatitude ?? null
  );
  const [destinationLongitude, setDestinationLongitude] = useState(
    specificLongitude ?? null
  );

  const handleClickRouter = () => {
    router.push(`/schedule/${scheduleId}/election/start`);
  };

  const handleSaveSpecificLocation = () => {
    updateScheduleInfo({
      scheduleId,
      data: {
        specificLocation: destination,
        specificLatitude: destinationLatitude?.toString(),
        specificLongitude: destinationLongitude?.toString(),
      },
    });
    setIsOpen(false);
  };

  return (
    <>
      <BottomSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        snapPoints={snapPoints}
        initialSnap={1}
        hideBackdrop={true}
      >
        {() => (
          <div className="min-w-[375px] w-full max-w-185 flex flex-col mx-auto h-full">
            <div className="flex-shrink-0 px-5 pt-3">
              <BottomSheetHeader
                setIsOpen={setIsOpen}
                title="모임 장소 정하기"
              />
            </div>

            <div className="flex-1 overflow-y-auto px-5">
              <div className="flex flex-col gap-8 py-8">
                <ShareButton
                  title="어디서 만날지 고민이라면?"
                  description="여러분의 중간 위치를 똑똑하게 찾아드려요!"
                  mode="help"
                  color="var(--color-primary-100)"
                  borderColor="var(--color-primary-400)"
                  onClick={handleClickRouter}
                ></ShareButton>

                <div className="space-y-4 w-full">
                  <FinalDestinationSearch
                    destination={destination}
                    setDestination={setDestination}
                    setDestinationLatitude={setDestinationLatitude}
                    setDestinationLongitude={setDestinationLongitude}
                  />
                  {location && (
                    <div className="w-full flex flex-col gap-2">
                      <Input
                        label="중간 장소"
                        fullWidth={true}
                        value={location}
                        readOnly
                        disabled
                      />
                    </div>
                  )}
                </div>
                <div className="h-20"></div>
              </div>
            </div>
          </div>
        )}
      </BottomSheet>

      {isOpen && (
        <div className="fixed bottom-9 left-0 right-0 px-5 z-[99999]">
          <div className="min-w-[335px] w-full max-w-185 mx-auto">
            <Button onClick={handleSaveSpecificLocation}>저장하기</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationEditBottomSheet;

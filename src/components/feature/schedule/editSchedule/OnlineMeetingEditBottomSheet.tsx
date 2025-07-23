import BottomSheet from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ShareButton from "@/components/ui/ShareButton";
import zoomIcon from "@/assets/icon/zoom_icon.svg";
import googleMeetIcon from "@/assets/icon/googlemeet_icon.svg";
import discordIcon from "@/assets/icon/discord_icon.svg";
import zepIcon from "@/assets/icon/zep_icon.svg";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import BottomSheetHeader from "@/components/layout/BottomSheetHeader";
import {
  useCreateMeetingRoom,
  useUpdateScheduleInfo,
} from "@/lib/api/scheduleApi";

interface OnlineMeetingEditBottomSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  scheduleId: string;
}

type PlatformType = "ZOOM" | "GOOGLE_MEET" | "DISCORD" | "ZEP";

const OnlineMeetingEditBottomSheet = ({
  isOpen,
  setIsOpen,
  scheduleId,
}: OnlineMeetingEditBottomSheetProps) => {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType | null>(
    null
  );
  const [inputValue, setInputValue] = useState("");
  const isMobile = useMediaQuery("(min-width: 640px)");
  const snapPoints = isMobile ? [0.5] : [0.8];
  const createMeetingRoom = useCreateMeetingRoom();
  const updateScheduleInfo = useUpdateScheduleInfo();

  const ICONMAP: Record<PlatformType, string> = {
    ZOOM: zoomIcon,
    GOOGLE_MEET: googleMeetIcon,
    DISCORD: discordIcon,
    ZEP: zepIcon,
  };

  const handleChangePlatform = (p: PlatformType) => {
    setSelectedPlatform(p);
  };

  const handleCreateMeetingRoom = () => {
    createMeetingRoom.mutate(scheduleId);
    setIsOpen(false);
  };

  console.log(typeof scheduleId);

  const handleUpdateMeetingRoom = () => {
    updateScheduleInfo.mutate({
      scheduleId,
      data: {
        meetingPlatform: selectedPlatform as PlatformType,
        platformUrl: inputValue,
      },
    });
    setIsOpen(false);
  };

  return (
    <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen} snapPoints={snapPoints}>
      {() => (
        <div className="min-w-[375px] w-full max-w-185 flex flex-col items-center px-5 mx-auto pt-3 gap-8">
          <BottomSheetHeader
            setIsOpen={setIsOpen}
            title="온라인 회의장 정하기"
          />
          <ShareButton
            title="회의장이 없나요"
            description="Zoom 회의장을 만들어드려요"
            mode="help"
            color="var(--color-primary-100)"
            borderColor="var(--color-primary-400)"
            onClick={handleCreateMeetingRoom}
          ></ShareButton>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-5">
              <p className="font-medium text-[color:var(--color-black)] text-sm">
                온라인 회의장 종류
              </p>
              <div className="flex gap-6">
                {(Object.keys(ICONMAP) as PlatformType[]).map((p) => (
                  <div
                    key={p}
                    className={`flex justify-center items-center w-10 h-10 rounded-lg cursor-pointer
                    ${
                      selectedPlatform === p
                        ? "bg-[color:var(--color-muted)]"
                        : ""
                    }
                    hover:bg-[color:var(--color-muted)]`}
                    onClick={() => handleChangePlatform(p)}
                  >
                    <Image
                      src={ICONMAP[p]}
                      alt={`${p} 아이콘`}
                      className="w-6 h-6"
                    />
                  </div>
                ))}
              </div>
            </div>
            <Input
              fullWidth={true}
              placeholder="온라인 회의장 링크를 입력해주세요"
              value={inputValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
            />
            <button className="cursor-pointer text-[color:var(--color-red)] text-xs font-semibold">
              삭제하기
            </button>
          </div>
          <Button onClick={handleUpdateMeetingRoom}>저장하기</Button>
        </div>
      )}
    </BottomSheet>
  );
};

export default OnlineMeetingEditBottomSheet;

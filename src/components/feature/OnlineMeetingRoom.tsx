import { AtSign, ChevronRight, Pen } from "lucide-react";
import zoomIcon from "@/assets/icon/zoom_icon.svg";
import googleMeetIcon from "@/assets/icon/googlemeet_icon.svg";
import discordIcon from "@/assets/icon/discord_icon.svg";
import zepIcon from "@/assets/icon/zep_icon.svg";
import Image from "next/image";
import OnlineMeetingEditBottomSheet from "./schedule/editSchedule/OnlineMeetingEditBottomSheet";
import { useState } from "react";
import Link from "next/link";

interface OnlineMeetingRoomProps {
  scheduleId: string;
  platform?: string;
  url?: string;
}

type PlatformType = "ZOOM" | "GOOGLE_MEET" | "DISCORD" | "ZEP";

const OnlineMeetingRoom = ({
  scheduleId,
  platform,
  url,
}: OnlineMeetingRoomProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const PLATFORM = {
    ZOOM: zoomIcon,
    GOOGLE_MEET: googleMeetIcon,
    DISCORD: discordIcon,
    ZEP: zepIcon,
  };

  return (
    <div className="bg-[color:var(--color-white)] px-5 py-4 gap-4 rounded-lg flex flex-col shadow-[var(--shadow-common)]">
      <div className="flex w-full justify-between items-center">
        <div className="flex gap-4 items-center">
          <div>
            <AtSign className="w-3 h-3 text-[color:var(--color-black)]" />
          </div>
          <div className="text-[color:var(--color-primary-300)] text-xs">
            온라인 회의장
          </div>
        </div>
        <div onClick={() => setIsOpen(true)}>
          <Pen className="w-3 h-3 text-[color:var(--color-gray)] cursor-pointer" />
        </div>
      </div>
      {(!platform && !url) ||
        (platform == "NONE" && (
          <div className="flex w-full justify-center items-center py-4 text-xs text-[color:var(--color-gray)]">
            연동된 온라인 회의장이 없습니다.
          </div>
        ))}
      {platform && url && platform !== "NONE" && (
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-4 items-center">
            <div>
              <Image
                src={PLATFORM[platform as PlatformType]}
                alt={`${platform} 아이콘`}
              />
            </div>
            <div className="text-[color:var(--color-black)] text-sm">
              {platform}
            </div>
          </div>
          <Link href={url} target="blank">
            <ChevronRight className="w-[14px] h-[14px] text-[color:var(--color-gray)]" />
          </Link>
        </div>
      )}
      <OnlineMeetingEditBottomSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        scheduleId={scheduleId}
      />
    </div>
  );
};

export default OnlineMeetingRoom;

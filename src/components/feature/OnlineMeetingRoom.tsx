import { AtSign, ChevronRight, Pen } from "lucide-react";
import zoomIcon from "@/assets/icon/zoom_icon.svg";
import googleMeetIcon from "@/assets/icon/googlemeet_icon.svg";
import discordIcon from "@/assets/icon/discord_icon.svg";
import zepIcon from "@/assets/icon/zep_icon.svg";
import Image from "next/image";

type Platform = "zoom" | "googleMeet" | "discord" | "zep";

interface OnlineMeetingRoomProps {
  platform?: Platform;
  name?: string;
}

const OnlineMeetingRoom = ({ platform, name }: OnlineMeetingRoomProps) => {
  const PLATFORM = {
    zoom: zoomIcon,
    googleMeet: googleMeetIcon,
    discord: discordIcon,
    zep: zepIcon,
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
        <div>
          <Pen className="w-3 h-3 text-[color:var(--color-gray)]" />
        </div>
      </div>
      {!platform && !name && (
        <div className="flex w-full justify-center items-center py-4 text-xs text-[color:var(--color-gray)]">
          연동된 온라인 회의장이 없습니다.
        </div>
      )}
      {platform && name && (
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-4 items-center">
            <div>
              <Image src={PLATFORM[platform]} alt={`${platform} 아이콘`} />
            </div>
            <div className="text-[color:var(--color-black)] text-sm">
              {name}
            </div>
          </div>
          <div>
            <ChevronRight className="w-[14px] h-[14px] text-[color:var(--color-gray)]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineMeetingRoom;

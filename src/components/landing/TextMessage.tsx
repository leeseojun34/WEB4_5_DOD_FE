import { profileImages } from "@/lib/profileImages";
import Image from "next/image";

const TextMessage = ({
  text,
  isMine,
  characterIndex,
  className,
  isSE,
}: {
  text: string;
  isMine: boolean;
  characterIndex: number;
  className?: string;
  isSE: boolean;
}) => {
  const profileImage = profileImages[characterIndex];
  return (
    <div>
      <div
        className={`w-53 transparent ${
          isSE ? "px-7" : "px-4"
        } space-y-1 flex flex-col ${isMine ? "items-end" : "items-start"} ${
          className ?? ""
        }`}
      >
        {!isMine && (
          <Image
            src={profileImage}
            alt={`프로필 이미지${characterIndex}`}
            width={21}
            height={23}
          />
        )}
        <div
          className={`${
            isMine
              ? "text-[color:var(--color-black)] bg-[color:var(--color-gray-background)] rounded-[8px] rounded-tr-none"
              : "text-[color:var(--color-white)] bg-[color:var(--color-primary-400)] rounded-[8px] rounded-tl-none"
          } p-2 text-xs w-fit`}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default TextMessage;

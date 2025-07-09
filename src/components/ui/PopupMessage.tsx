import rabbit from "@/assets/images/profile_pastel_skyblue.png";
import Image from "next/image";

interface PopupMessageProps {
  children: React.ReactNode;
}

const PopupMessage = ({ children }: PopupMessageProps) => {
  return (
    <div className="w-fit py-1.5 px-4.5 select-none border rounded-full border-[var(--color-primary-400)] shadow-[0_4px_14px_rgba(0,0,0,0.15)]">
      <div className="flex justify-center items-center gap-1">
        <Image src={rabbit} alt="icon" width={16} height={18} />
        <p className="text-xs font-medium">{children}</p>
      </div>
    </div>
  );
};

export default PopupMessage;

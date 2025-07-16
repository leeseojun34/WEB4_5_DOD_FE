"use client";
import HomeIcon from "@/assets/icon/home_icon.svg";
import { UserRound, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="w-full fixed bottom-0">
      <div className="flex shadow-[var(--shadow-common)] rounded-t-sm bg-[var(--color-white)] h-21 px-18 pb-4.5 pt-2.5 justify-between items-center relative">
        <button onClick={() => router.push("/")} className="cursor-pointer">
          <Image
            src={HomeIcon}
            alt="홈"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 -top-6">
          <button className="w-15 h-15 rounded-full bg-[var(--color-primary-400)] flex items-center justify-center text-[var(--color-white)] cursor-pointer hover:bg-[var(--color-primary-400-hover)] transition duration-300 shadow-lg">
            <Plus />
          </button>
        </div>
        <button
          onClick={() => router.push("/mypage")}
          className="cursor-pointer"
        >
          <UserRound className="w-8 h-8" strokeWidth={1.5} />
        </button>
      </div>
    </footer>
  );
};
export default Footer;

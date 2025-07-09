import bannerImg from "@/assets/images/banner_jewerly.png";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export const Banner = () => {
  return (
    <div className="flex w-[335px] h-30 bg-gradient-to-r from-[#8AB6FF] to-[#5291F4] rounded-[20px] px-6 justify-between items-center md:relative md:justify-end">
      <Image src={bannerImg} alt="배너 이미지" priority className="w-28 h-28" />
      <div className="flex flex-col h-full justify-between py-5">
        <div className="font-[TTTogether] text-[color:var(--color-white)] font-regular text-xl text-end">
          내 보석함에서 <br />
          누구를 꺼내 볼까?
        </div>
        <button className="flex text-xs text-[color:var(--color-white)] justify-end">
          일정 만들러 가기 <ArrowRight className="w-[14px] h-4" />
        </button>
      </div>
    </div>
  );
};

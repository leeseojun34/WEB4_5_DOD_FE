import bannerImg from "@/assets/images/banner_jewerly.png";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export const Banner = () => {
  return (
    <div className="flex w-full h-30 md:h-[178px] bg-gradient-to-r from-[#8AB6FF] to-[#5291F4] rounded-[20px] px-4 md:px-10 justify-between items-center">
      <Image
        src={bannerImg}
        alt="배너 이미지"
        priority
        className="w-24 h-24 md:w-[242px] md:h-[182px]"
      />
      <div className="flex flex-col h-auto justify-between py-5">
        <div className="font-[TTTogether] text-[color:var(--color-white)] font-regular text-xl md:text-[40px] text-end">
          내 보석함에서 <br />
          누구를 꺼내 볼까?
        </div>
        <button className="flex text-xs md:text-xl text-[color:var(--color-white)] justify-end items-center">
          일정 만들러 가기 <ArrowRight className="w-[14px] h-4" />
        </button>
      </div>
    </div>
  );
};

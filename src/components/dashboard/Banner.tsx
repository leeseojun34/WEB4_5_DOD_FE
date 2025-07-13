import bannerImg from "@/assets/images/banner_jewerly.png";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Banner = () => {
  return (
    <Link
      href={"/meeting"}
      className="flex w-full h-30 md:h-[178px] bg-gradient-to-r from-[#8AB6FF] to-[#5291F4] rounded-[20px] px-6 md:px-10 justify-between items-center"
    >
      <Image
        src={bannerImg}
        alt="배너 이미지"
        priority
        className="w-28 h-28 md:w-[170px] md:h-[170px]"
      />
      <div className="flex flex-col h-auto justify-between py-5">
        <div className="font-[TTTogether] text-[color:var(--color-white)] font-regular text-xl md:text-[40px] text-end">
          내 보석함에서 <br />
          누구를 꺼내 볼까?
        </div>
        <div className="flex text-xs md:text-xl text-[color:var(--color-white)] justify-end items-center cursor-pointer">
          일정 만들러 가기 <ArrowRight className="w-[14px] h-4" />
        </div>
      </div>
    </Link>
  );
};

import bannerImg from "@/assets/images/banner_rabbit.png";
import Image from "next/image";
import Link from "next/link";
import LogoWebHeader from "../ui/LogoWebHeader";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export const Banner = () => {
  const router = useRouter();
  return (
    <>
      <div className="w-full flex justify-start sm:hidden px-4">
        <LogoWebHeader type="" handleLogoClick={() => router.push("/")} />
      </div>
      <Link
        href={"/meeting"}
        className="relative flex w-full h-35 sm:h-40 md:h-50 bg-gradient-to-r from-[#8AB6FF] to-[#5291F4] rounded-[20px] px-5 md:px-10 justify-between items-center"
      >
        <Image
          src={bannerImg}
          alt="배너 이미지"
          priority
          className="absolute bottom-0 w-34 h-28 md:w-[170px] md:h-[170px]"
        />
        <div className="flex flex-col w-full h-full justify-between items-end py-6 ">
          <div className="font-[TTTogether] text-[color:var(--color-white)] font-regular leading-8 text-[30px] md:text-[40px] text-end">
            보고싶다 친구야
            <br />
            우리 이때어때!
          </div>

          <div className="w-full flex text-xs md:text-xl text-[color:var(--color-white)] justify-end items-center cursor-pointer">
            일정 만들러 가기 <ArrowRight className="ml-2 w-[12px] h-4" />
          </div>
        </div>
      </Link>
    </>
  );
};

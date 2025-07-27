"use client";

import Image from "next/image";
import SectionLayout from "./SectionLayout";
import rabbitsImage from "@/assets/images/landing_rabbits.png";

const Section3 = () => {
  return (
    <SectionLayout>
      <div className="font-bold text-[28px] text-[color:var(--color-black)] text-start w-full">
        복잡한{" "}
        <span className="text-[color:var(--color-primary-400)]">일정 </span>
        조율,
        <br />{" "}
        <span className="text-[color:var(--color-primary-400)]">간편 </span>하게
        끝내요
      </div>
      <Image
        src={rabbitsImage}
        alt="일정 조율하는 토끼 이미지"
        width={270}
        height={300}
        unoptimized
      />
      <div>
        <div className="font-semibold text-xl text-[color:var(--color-black)]">
          쉽고 빠르게 일정 만들기
        </div>
        <div className="text-sm text-[color:var(--color-gray)]">
          이름과 시간만 입력하면 바로 생성! <br />
          링크 공유로 빠르게 참여받기 🙌
        </div>
      </div>
    </SectionLayout>
  );
};
export default Section3;

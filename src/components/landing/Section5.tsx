"use client";

import Image from "next/image";
import SectionLayout from "./SectionLayout";
import dashboardImg from "@/assets/images/landing_dashbard.png";

const Section5 = () => {
  return (
    <SectionLayout sectionNum="section5">
      <div className="font-bold text-[28px] text-[color:var(--color-black)] w-full text-start">
        내 하루와 모임, <br />
        <span className="text-[color:var(--color-primary-400)]">대시보드</span>
        로 깔끔하게
      </div>
      <Image src={dashboardImg} alt="대시보드 미리보기 이미지" unoptimized />
      <div className="flex flex-col gap-2 text-sm text-[color:var(--color-gray)] pb-20">
        <p>🗓️ 캘린더로 나의 하루를 정리하고</p>
        <p>📌 모임 일정은 리스트로 쏙쏙</p>
        <p>🔍 참여한 모든 모임을 한눈에 확인해요!</p>
      </div>
    </SectionLayout>
  );
};
export default Section5;

"use client";

import Image from "next/image";
import SectionLayout from "./SectionLayout";
import groupManageImg from "@/assets/images/landing_group_management.png";
import groupAnalyticsImg from "@/assets/images/landing_group_analytics.png";

const Section4 = () => {
  return (
    <SectionLayout sectionNum="section4">
      <div className="text-[28px] font-bold text-[color:var(--color-black)]">
        <span className="text-[color:var(--color-primary-400)]">그룹</span>과
        함께, <br />더 체계적으로
      </div>
      <div className="flex items-center w-full">
        <div className="flex flex-col gap-5 flex-1 pl-10">
          <div className="text-xl font-semibold text-[color:var(--color-black)]">
            간편한 그룹 관리
          </div>
          <div className="text-sm text-[color:var(--color-gray)]">
            정해진 멤버 내에서 <br />
            일정을 조율해요
          </div>
        </div>
        <Image src={groupManageImg} alt="그룹 관리 이미지" unoptimized />
      </div>
      <div className="flex items-center w-full">
        <Image src={groupAnalyticsImg} alt="그룹 통계 이미지" unoptimized />
        <div className="flex flex-col gap-5 flex-1 pr-10">
          <div className="text-xl font-semibold text-[color:var(--color-black)] text-end">
            모임 통계도 한눈에
          </div>
          <div className="text-sm text-[color:var(--color-gray)] text-end">
            요일별 모임, 멤버별
            <br /> 참여율까지 분석해드려요
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};
export default Section4;

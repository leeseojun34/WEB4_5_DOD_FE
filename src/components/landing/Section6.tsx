"use client";

import Image from "next/image";
import SectionLayout from "./SectionLayout";
import studyRabbitsImg from "@/assets/images/landing_study_rabbits.png";

const Section6 = () => {
  return (
    <SectionLayout sectionNum="section6" bgColor="skyblue">
      <div className="flex flex-col gap-11 items-center">
        <div className="font-bold text-[28px] text-[color:var(--color-black)]">
          <span className="text-[color:var(--color-primary-400)]">모임</span>의
          시작부터 끝까지
        </div>
        <div className="font-medium text-xl text-[color:var(--color-gray)]">
          당신의 소중한 시간을 더 가치있게
          <br /> 지금,
          <span className="text-[color:var(--color-primary-400)]">
            이때 어때
          </span>
          와 함께하세요
        </div>
        <Image src={studyRabbitsImg} alt="스터디하는 토끼 이미지" />
      </div>
    </SectionLayout>
  );
};
export default Section6;

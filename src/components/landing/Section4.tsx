"use client";

import Image from "next/image";
import SectionLayout from "./SectionLayout";
import groupManageImg from "@/assets/images/landing_group_management.png";
import groupAnalyticsImg from "@/assets/images/landing_group_analytics.png";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Section4 = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const groupManagementImgRef = useRef<HTMLImageElement>(null);
  const groupAnalyticsImgRef = useRef<HTMLImageElement>(null);
  const subtitle1Ref = useRef<HTMLDivElement>(null);
  const subtitle2Ref = useRef<HTMLDivElement>(null);
  const description1Ref = useRef<HTMLDivElement>(null);
  const description2Ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      !titleRef.current ||
      !groupManagementImgRef.current ||
      !groupAnalyticsImgRef.current ||
      !subtitle1Ref.current ||
      !subtitle2Ref.current ||
      !description1Ref.current ||
      !description2Ref.current
    )
      return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 90%",
        end: "top 10%",
        scrub: 2,
      },
    });

    timeline.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, ease: "power4.out", duration: 2 }
    );

    timeline.fromTo(
      [subtitle1Ref.current, groupManagementImgRef.current],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, ease: "power4.out", duration: 2 },
      "+=0.2"
    );

    timeline.fromTo(
      description1Ref.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, ease: "power4.out", duration: 2 },
      "+=0.2"
    );

    timeline.fromTo(
      [subtitle2Ref.current, groupAnalyticsImgRef.current],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, ease: "power4.out", duration: 2 },
      "+=0.2"
    );

    timeline.fromTo(
      description2Ref.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, ease: "power4.out", duration: 2 },
      "+=0.2"
    );
  }, []);
  return (
    <SectionLayout sectionNum="section4">
      <div
        ref={titleRef}
        className="text-[28px] font-bold text-[color:var(--color-black)]"
      >
        <span className="text-[color:var(--color-primary-400)]">그룹</span>과
        함께, <br />더 체계적으로
      </div>
      <div className="flex items-center w-full">
        <div className="flex flex-col gap-5 flex-1 pl-10">
          <div
            ref={subtitle1Ref}
            className="text-xl font-semibold text-[color:var(--color-black)]"
          >
            간편한 그룹 관리
          </div>
          <div
            ref={description1Ref}
            className="text-sm text-[color:var(--color-gray)]"
          >
            정해진 멤버 내에서 <br />
            일정을 조율해요
          </div>
        </div>
        <Image
          ref={groupManagementImgRef}
          src={groupManageImg}
          alt="그룹 관리 이미지"
          unoptimized
        />
      </div>
      <div className="flex items-center w-full">
        <Image
          ref={groupAnalyticsImgRef}
          src={groupAnalyticsImg}
          alt="그룹 통계 이미지"
          unoptimized
        />
        <div className="flex flex-col gap-5 flex-1 pr-10">
          <div
            ref={subtitle2Ref}
            className="text-xl font-semibold text-[color:var(--color-black)] text-end"
          >
            모임 통계도 한눈에
          </div>
          <div
            ref={description2Ref}
            className="text-sm text-[color:var(--color-gray)] text-end"
          >
            요일별 모임, 멤버별
            <br /> 참여율까지 분석해드려요
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};
export default Section4;

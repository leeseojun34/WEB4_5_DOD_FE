"use client";

import Image from "next/image";
import SectionLayout from "./SectionLayout";
import dashboardImg from "@/assets/images/landing_dashbard.png";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Section5 = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const iphoneImgRef = useRef<HTMLImageElement>(null);
  const description1Ref = useRef<HTMLParagraphElement>(null);
  const description2Ref = useRef<HTMLParagraphElement>(null);
  const description3Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (
      !titleRef.current ||
      !description1Ref.current ||
      !description2Ref.current ||
      !description3Ref.current
    )
      return;
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          end: "top 50%",
          scrub: 2,
        },
      }
    );

    gsap.fromTo(
      iphoneImgRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: iphoneImgRef.current,
          start: "top 85%",
          end: "top 50%",
          scrub: 2,
        },
      }
    );

    gsap.fromTo(
      [
        description1Ref.current,
        description2Ref.current,
        description3Ref.current,
      ],
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: description1Ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);
  return (
    <SectionLayout sectionNum="section5">
      <div
        ref={titleRef}
        className="font-bold text-[28px] text-[color:var(--color-black)] w-full text-start sm:text-4xl leading-12 mb-4"
      >
        내 하루와 모임, <br />
        <span className="text-[color:var(--color-primary-400)]">대시보드</span>
        로 깔끔하게
      </div>
      <Image
        ref={iphoneImgRef}
        src={dashboardImg}
        alt="대시보드 미리보기 이미지"
        unoptimized
      />
      <div className="flex flex-col gap-4 text-sm text-[color:var(--color-gray)] pb-20 mt-3">
        <p ref={description1Ref}>🗓️ 캘린더로 나의 하루를 정리하고</p>
        <p ref={description2Ref}>📌 모임 일정은 리스트로 쏙쏙</p>
        <p ref={description3Ref}>🔍 참여한 모든 모임을 한눈에 확인해요!</p>
      </div>
    </SectionLayout>
  );
};
export default Section5;

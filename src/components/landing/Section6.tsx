"use client";

import Image from "next/image";
import SectionLayout from "./SectionLayout";
import studyRabbitsImg from "@/assets/images/landing_study_rabbits.png";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Section6 = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const description1Ref = useRef<HTMLParagraphElement>(null);
  const description2Ref = useRef<HTMLParagraphElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (
      !titleRef.current ||
      !description1Ref.current ||
      !description2Ref.current
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
      description1Ref.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: description1Ref.current,
          start: "top 85%",
          end: "top 50%",
          scrub: 2,
        },
      }
    );
    gsap.fromTo(
      description2Ref.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: description2Ref.current,
          start: "top 85%",
          end: "top 50%",
          scrub: 2,
        },
      }
    );

    gsap.fromTo(
      imgRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top 85%",
          end: "top 50%",
          scrub: 2,
        },
      }
    );
  }, []);
  return (
    <SectionLayout sectionNum="section6" bgColor="skyblue">
      <div className="flex flex-col gap-11 items-center">
        <div
          ref={titleRef}
          className="font-bold text-[28px] text-[color:var(--color-black)]"
        >
          <span className="text-[color:var(--color-primary-400)]">모임</span>의
          시작부터 끝까지
        </div>
        <div className="font-medium text-xl text-[color:var(--color-gray)]">
          <p ref={description1Ref}>당신의 소중한 시간을 더 가치있게</p>
          <p ref={description2Ref}>
            지금,
            <span className="text-[color:var(--color-primary-400)]">
              이때 어때
            </span>
            와 함께하세요
          </p>
        </div>
        <Image
          ref={imgRef}
          src={studyRabbitsImg}
          alt="스터디하는 토끼 이미지"
        />
      </div>
    </SectionLayout>
  );
};
export default Section6;

"use client";

import Image from "next/image";
import SectionLayout from "./SectionLayout";
import iphoneImage from "@/assets/images/iphone_image.png";
import TextMessage from "./TextMessage";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const description1Ref = useRef<HTMLParagraphElement>(null);
  const description2Ref = useRef<HTMLParagraphElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const iphoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !titleRef.current ||
      !description1Ref.current ||
      !description2Ref.current ||
      !messageRef.current ||
      !iphoneRef.current
    )
      return;
    const messageEls = gsap.utils.toArray<HTMLDivElement>(".message-item");

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
      iphoneRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: iphoneRef.current,
          start: "top 85%",
          end: "top 50%",
          scrub: 2,
        },
      }
    );

    gsap.fromTo(
      messageEls,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.4,
        stagger: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: messageRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const messages = [
    { text: "우리 언제 만나", isMine: true, characterIndex: 1 },
    { text: "되는 시간 언제야?", isMine: false, characterIndex: 5 },
    { text: "난 수요일 가능", isMine: false, characterIndex: 3 },
    {
      text: "헐 난 수요일 안됨 ㅠㅠ 목요일은?",
      isMine: true,
      characterIndex: 1,
    },
    { text: "목요일은 내가 안돼", isMine: false, characterIndex: 4 },
    { text: "그럼 다음에 봐야겠네", isMine: true, characterIndex: 1 },
  ];
  return (
    <SectionLayout bgColor="blue" sectionNum="section2">
      <div className="flex flex-col gap-9">
        <div
          ref={titleRef}
          className="font-bold text-[color:var(--color-white)] text-[28px] text-center "
        >
          스케쥴 잡다가
          <br /> 시간 다 간 적 있나요?
        </div>
        <div className="text-xs text-[color:var(--color-white)] text-center leading-6 flex flex-col">
          <p ref={description1Ref}>💬 단톡방에서 끝없는 시간 조율…</p>
          <p ref={description2Ref}>
            🤯 시간, 장소, 링크 따로 관리하느라 정신없다면?
          </p>
        </div>
        <div ref={iphoneRef} className="relative">
          <Image src={iphoneImage} alt="아이폰 이미지" />

          <div
            ref={messageRef}
            className="absolute top-16 left-0 right-0 flex flex-col items-center gap-3"
          >
            {messages.map((msg, index) => (
              <TextMessage
                key={index}
                text={msg.text}
                isMine={msg.isMine}
                characterIndex={msg.characterIndex}
                className="message-item"
              />
            ))}
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};
export default Section2;

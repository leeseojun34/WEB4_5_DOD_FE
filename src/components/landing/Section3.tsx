"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import zoomRabbits from "@/assets/images/zoom_rabbits.png";
import mapRabbits from "@/assets/images/map_rabbits.png";
import timetableRabbits from "@/assets/images/timetable_rabbits.png";
import vacationRabbit from "@/assets/images/vacation_rabbit.png";
import MvpCard from "./MvpCard";

const mvpCards = [
  {
    title: "쉽고 빠르게 일정 만들기",
    description: [
      "이름과 시간만 입력하면 바로 생성!",
      "링크 공유로 빠르게 참여받기 🙌",
    ],
    imageSrc: vacationRabbit,
  },
  {
    title: "가능한 시간대 한눈에 확인",
    description: [
      "가장 빨리, 가장 오래 만날 수 있는 시간 자동 추천!",
      "참여자의 가능 시간도 실시간으로 확인 👀",
    ],
    imageSrc: timetableRabbits,
  },
  {
    title: "중간 장소 실시간 투표",
    description: [
      "출발지를 입력하면",
      "모두에게 편한 위치를 똑똑하게 제안해줘요 📍",
    ],
    imageSrc: mapRabbits,
  },
  {
    title: "회의 정보까지 한 번에",
    description: [
      "워크스페이스 링크, 회의 링크 등록은 기본!",
      "Zoom 회의장도 바로 개설할 수 있어요 💻",
    ],
    imageSrc: zoomRabbits,
  },
];

export default function Section3() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!wrapperRef.current || !containerRef.current || !cardsRef.current)
      return;
    gsap.registerPlugin(ScrollTrigger);

    const totalCards = mvpCards.length;
    const cardWidth = 300 + 80;

    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    gsap.to(container, {
      x: () => `-${cardWidth * (totalCards - 1)}`,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: () => `+=${cardWidth * totalCards}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        snap: {
          snapTo: 1 / (totalCards - 1),
          duration: 0.4,
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          const progress = self.progress;
          const currentScroll = progress * (cardWidth * (totalCards - 1));

          cardsRef.current.forEach((card, index) => {
            const cardCenter = index * cardWidth;
            const distance = Math.abs(currentScroll - cardCenter);
            const scale = gsap.utils.clamp(1, 1.2, 1.2 - distance / 600);
            gsap.set(card, { scale });
          });
        },
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="w-screen h-screen overflow-hidden bg-white min-w-[375px] max-w-[740px] mx-auto"
    >
      <div className="pl-10 pt-20 font-bold text-[28px] text-[color:var(--color-black)] text-start w-full sm:text-4xl">
        복잡한{" "}
        <span className="text-[color:var(--color-primary-400)]">일정 </span>
        조율,
        <br />{" "}
        <span className="text-[color:var(--color-primary-400)]">간편 </span>하게
        끝내요
      </div>
      <div
        ref={containerRef}
        className="flex mt-30 h-auto items-center w-fit gap-[80px] px-[16vw]"
      >
        {mvpCards.map((card, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="w-[300px] h-[450px] flex-shrink-0"
          >
            <MvpCard {...card} />
          </div>
        ))}
      </div>
    </section>
  );
}

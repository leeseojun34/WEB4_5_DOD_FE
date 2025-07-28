"use client";

import Image from "next/image";
import rabbit from "@/assets/images/logo_half_rabbit.png";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import useMediaQuery from "../feature/schedule/hooks/useMediaQuery";

const MainLogo = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLParagraphElement>(null);
  const rightTextRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline
      .fromTo(
        [imageRef.current, leftTextRef.current],
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
      )
      .fromTo(
        rightTextRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
        "-=0.8"
      );
  }, []);
  const isSE = useMediaQuery("(max-width: 429px)");

  return (
    <div
      ref={logoRef}
      className={`relative z-20 font-[TTTogether] ${
        isSE ? "text-[150px]" : "text-[170px]"
      } sm:text-[200px] md:text-[250px] text-[color:var(--color-primary-400)]`}
    >
      <Image
        ref={imageRef}
        className="absolute right-1 sm:right-2 md:right-4 -top-20 sm:-top-22 md:-top-24 w-40 sm:w-45 md:w-50 z-[-1]"
        src={rabbit}
        alt="로고 토끼"
        priority
      />
      <p ref={leftTextRef} className="relative leading-none">
        이때
      </p>
      <p ref={rightTextRef} className="relative leading-none">
        어때
      </p>
    </div>
  );
};

export default MainLogo;

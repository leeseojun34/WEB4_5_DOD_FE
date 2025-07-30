"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { Bubble } from "../ui/Bubble";
import { useEffect, useRef, useState, ReactNode } from "react";

const sectionStyles: Record<string, string> = {
  section1:
    "flex flex-col px-10 justify-center items-center min-h-screen relative min-w-[375px] w-full max-w-[740px]",
  section2:
    "flex flex-col px-10 justify-center items-center min-h-screen relative min-w-[375px] w-full max-w-[740px]",
  section3:
    "flex flex-col px-10 justify-center items-center min-h-screen relative min-w-[375px] w-full max-w-[740px]",
  section4:
    "flex flex-col px-0 justify-center items-center min-h-screen relative min-w-[375px] w-full max-w-[740px]",
  section5:
    "flex flex-col px-10 justify-center items-center min-h-screen relative min-w-[375px] w-full max-w-[740px]",
  section6:
    "flex flex-col px-10 justify-center items-center min-h-screen relative min-w-[375px] w-full max-w-[740px]",
};

interface SectionLayoutProps {
  children: ReactNode;
  bgColor?: string;
  sectionNum: string;
}

const SectionLayout = ({
  children,
  bgColor,
  sectionNum,
}: SectionLayoutProps) => {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.9 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const backgroundColorClass =
    bgColor === "blue"
      ? "bg-[color:var(--color-primary-400)]"
      : bgColor === "skyblue"
      ? "bg-[color:var(--color-primary-100)]"
      : "bg-[color:var(--color-white)]";

  return (
    <div>
      <section
        ref={sectionRef}
        id={sectionNum}
        className={`${backgroundColorClass} flex justify-center`}
      >
        <main className={sectionStyles[sectionNum]}>
          {children}

          <div className="fixed bottom-9 w-full px-5 flex items-center gap-3 flex-col z-50">
            {["section1", "section6"].includes(sectionNum) && isVisible && (
              <Bubble>복잡한 일정 조율, 한 번에 끝내세요 🔥</Bubble>
            )}
            <Button
              state="default"
              onClick={() => router.push("/auth/login")}
              className="shadow-sm"
            >
              이때어때 시작하기
            </Button>
          </div>
        </main>
      </section>
    </div>
  );
};

export default SectionLayout;

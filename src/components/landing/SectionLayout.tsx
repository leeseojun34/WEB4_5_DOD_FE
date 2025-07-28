"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { ReactNode } from "react";

const sectionStyles: Record<string, string> = {
  section1:
    "flex flex-col px-10 justify-center items-center min-h-screen relative min-w-[375px] w-full max-w-185",
  section2:
    "flex flex-col px-10 justify-center items-center min-h-screen relative min-w-[375px] w-full max-w-185",
  section3:
    "flex flex-col px-10 justify-center items-center min-h-screen relative min-w-[375px] w-full max-w-185",
  section4:
    "flex flex-col px-0 justify-center items-center min-h-screen relative min-w-[375px] w-full max-w-185",
  section5:
    "flex flex-col px-10 justify-center items-center min-h-screen relative min-w-[375px] w-full max-w-185",
  section6:
    "flex flex-col px-10 pt-24 items-center min-h-screen relative min-w-[375px] w-full max-w-185",
};

const SectionLayout = ({
  children,
  bgColor,
  sectionNum,
}: {
  children: ReactNode;
  bgColor?: string;
  sectionNum: string;
}) => {
  const router = useRouter();

  return (
    <section
      id={sectionNum}
      className={`${
        bgColor === "blue"
          ? "bg-[color:var(--color-primary-400)]"
          : bgColor === "skyblue"
          ? "bg-[color:var(--color-primary-100)]"
          : "bg-[color:var(--color-white)]"
      } flex justify-center`}
    >
      <main className={sectionStyles[sectionNum]}>
        {children}
        <div className="fixed bottom-9 w-full px-5 flex items-center gap-3 flex-col z-50">
          <Button state="default" onClick={() => router.push("/auth/login")}>
            이때어때 시작하기
          </Button>
        </div>
      </main>
    </section>
  );
};

export default SectionLayout;

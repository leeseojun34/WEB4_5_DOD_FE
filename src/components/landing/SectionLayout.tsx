"use client";

import { useRouter } from "next/navigation";
import { Bubble } from "../ui/Bubble";
import { Button } from "../ui/Button";
import { ReactNode } from "react";

const SectionLayout = ({
  children,
  bgColor,
}: {
  children: ReactNode;
  bgColor?: string;
}) => {
  const router = useRouter();

  return (
    <section
      className={`${
        bgColor === "blue"
          ? "bg-[color:var(--color-primary-400)]"
          : "bg-[color:var(--color-white)]"
      }`}
    >
      <main className="flex flex-col px-5 justify-center items-center min-h-screen relative">
        {children}
        <div className="fixed bottom-9 w-full px-5 flex items-center gap-3 flex-col z-50">
          {/* <Bubble>복잡한 일정 조율, 한 번에 끝내세요 🔥</Bubble> */}
          <Button state="default" onClick={() => router.push("/auth/login")}>
            이때어때 시작하기
          </Button>
        </div>
      </main>
    </section>
  );
};

export default SectionLayout;

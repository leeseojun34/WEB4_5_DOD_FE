"use client";

import { useRouter } from "next/navigation";
import { Bubble } from "../ui/Bubble";
import { Button } from "../ui/Button";
import MainLogo from "./MainLogo";
import Header from "../layout/Header";

const Landing = () => {
  const router = useRouter();
  return (
    <section>
      <div className="hidden sm:block">
        <Header />
      </div>
      <main className="flex flex-col px-5 justify-center items-center min-h-screen relative">
        <MainLogo />
        <div className="absolute bottom-9 w-full px-5 flex items-center gap-3 flex-col">
          <Bubble>복잡한 일정 조율, 한 번에 끝내세요 🔥</Bubble>
          <Button state="default" onClick={() => router.push("/auth/login")}>
            이때어때 시작하기
          </Button>
        </div>
      </main>
    </section>
  );
};
export default Landing;

import Tip from "@/components/ui/Tip";
import Image from "next/image";
import purplerabbit from "@/assets/images/rabbit_walking_backpack.png";
import ScheduleCard from "@/components/ui/ScheduleCard";
import Header from "@/components/layout/Header";
import HeaderTop from "@/components/layout/HeaderTop";
import Footer from "@/components/layout/Footer";

const TimeResult = () => {
  return (
    <section>
      <div className="hidden sm:block">
        <Header />
      </div>
      <HeaderTop />
      <div className="flex flex-col  min-h-screen relative pb-32 pt-8 sm:pt-25 max-w-[740px] mx-auto px-5">
        <main>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2 pt-7.5 ">
              <h2 className="font-medium sm:text-2xl text-xl text-[var(--color-gray)]">
                카츠오모이 가는 날
              </h2>
              <h1 className="font-medium text-xl sm:text-2xl text-[var(--color-black)]">
                <span className="text-[var(--color-primary-400)]">6명</span>의
                시간 조율 결과
              </h1>
            </div>
            <Image
              src={purplerabbit}
              alt="purplerabbit"
              width={120}
              height={180}
            />
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4">
              <ScheduleCard
                variant="attendance"
                totalCount={6}
                members={["박은서", "현혜주"]}
                time="7월 4일 (금) 18:00 - 22:00"
              />
              <ScheduleCard
                variant="attendance"
                totalCount={6}
                members={["박상윤", "박은서", "황수지", "현혜주", "박준규"]}
                time="7월 4일 (금) 18:00 - 22:00"
              />
            </div>
            <Tip>
              일정을 선택하면 모임 리더가 되어 일정이 확정돼요.
              <br />
              함께할 구성원들과 먼저 상의해보는 걸 추천드려요!
            </Tip>
          </div>
        </main>
      </div>
      <div className="block sm:hidden">
        <Footer />
      </div>
    </section>
  );
};
export default TimeResult;

"use client";
import Tip from "@/components/ui/Tip";
import Image from "next/image";
import purplerabbit from "@/assets/images/rabbit_walking_backpack.png";
import Header from "@/components/layout/Header";
import HeaderTop from "@/components/layout/HeaderTop";
import Footer from "@/components/layout/Footer";
import { ChevronDown, ChevronUp } from "lucide-react";
import DropdownSmall from "@/components/ui/DropdownSmall";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useScheduleResult } from "@/lib/api/scheduleApi";
import GlobalLoading from "@/app/loading";
import TimeResultScheduleCard from "./TimeResultScheduleCard";

const TimeResult = () => {
  const { eventId } = useParams();
  const { data: eventDetail } = useScheduleResult(Number(eventId));
  const [list, setList] = useState<MeetingTimeType[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  const handleTopClick = () => {
    setList(eventDetail.data.recommendation.earliestMeetingTimes);
  };

  const handleBottomClick = () => {
    setList(eventDetail.data.recommendation.longestMeetingTimes);
  };

  useEffect(() => {
    if (eventDetail) {
      setList(eventDetail.data.recommendation.earliestMeetingTimes);
    }
  }, [eventDetail]);

  if (!eventDetail) {
    return <GlobalLoading />;
  }

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
                {eventDetail.data.eventTitle}
              </h2>
              <h1 className="font-medium text-xl sm:text-2xl text-[var(--color-black)]">
                <span className="text-[var(--color-primary-400)]">
                  {eventDetail.data.totalParticipants}명
                </span>
                의 시간 조율 결과
              </h1>
            </div>
            <Image
              src={purplerabbit}
              alt="purplerabbit"
              width={120}
              height={180}
              priority
            />
          </div>
          <div className="flex flex-col gap-2">
            <div
              className="flex text-[color:var(--color-gray-placeholder)] items-center gap-1 px-2 cursor-pointer relative"
              onClick={() => setIsOpen(true)}
            >
              <p className="text-xs">빠른 시간 순</p>
              {isOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}

              {isOpen && (
                <div className="absolute left-0 top-6">
                  <DropdownSmall
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    onTopClick={handleTopClick}
                    onBottomClick={handleBottomClick}
                  >
                    {["빠른 시간 순", "많은 참여자 순"]}
                  </DropdownSmall>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-5">
              <TimeResultScheduleCard
                list={list}
                totalParticipants={eventDetail.data.totalParticipants}
              />
              <Tip>
                일정을 선택하면 모임 리더가 되어 일정이 확정돼요.
                <br />
                함께할 구성원들과 먼저 상의해보는 걸 추천드려요!
              </Tip>
            </div>
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

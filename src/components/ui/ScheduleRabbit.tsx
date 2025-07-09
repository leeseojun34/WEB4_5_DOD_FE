import { useEffect, useState } from "react";
import Image from "next/image";
import rabbits from "@/assets/images/schedule_loading_rabbits.png";

const ScheduleLoadingRabbits = ({ level }: { level: number }) => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          className="relative w-1/3 flex flex-col items-center gap-2"
          key={index}
        >
          {index === level ? (
            <div className="w-full h-6 md:h-12">
              <MovingRabbit />
            </div>
          ) : (
            <div className="h-6 md:h-12"></div>
          )}
          <div className="relative w-full h-1 rounded-full bg-gray-200 overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${
                level === index || level > index
                  ? "bg-[var(--color-primary-400)] w-full"
                  : "w-0"
              }`}
            ></div>
          </div>
        </div>
      ))}
    </>
  );
};

const MovingRabbit = () => {
  const [start, setStart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStart(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Image
      src={rabbits}
      alt="loading_rabbit"
      width={18}
      height={24}
      className={`transition-transform duration-1000 md:w-9 md:h-12 ${
        start ? "translate-x-[100%]" : "translate-x-0"
      }`}
    />
  );
};

const ScheduleRabbit = ({ level }: { level: number }) => {
  return (
    <>
      <div className="flex flex-row gap-2 mt-10 mx-5">
        <ScheduleLoadingRabbits level={level} />
      </div>
    </>
  );
};

export default ScheduleRabbit;

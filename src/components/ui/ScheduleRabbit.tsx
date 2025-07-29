import { useEffect, useState } from "react";
import Image from "next/image";
import rabbits from "@/assets/images/schedule_loading_rabbits.png";

const ScheduleLoadingRabbits = ({ level }: { level: number }) => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          className="relative w-1/3 flex flex-col items-center gap-1"
          key={index}
        >
          {index === level ? (
            <div className="w-full h-8 md:h-12">
              <Moving target="rabbit" level={level} index={index} />
            </div>
          ) : (
            <div className="h-8 md:h-12"></div>
          )}
          <div className="relative w-full h-1 rounded-full bg-gray-200 overflow-hidden">
            <Moving target="info" level={level} index={index} />
          </div>
        </div>
      ))}
    </>
  );
};

const Moving = ({
  target,
  level,
  index,
}: {
  target: string;
  level: number;
  index: number;
}) => {
  const [start, setStart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStart(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  if (target === "info") {
    return (
      <div
        className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${
          (start && level === index) || level > index
            ? "bg-[var(--color-primary-400)] w-full"
            : "w-0"
        }`}
      ></div>
    );
  }

  return (
    <div
      className={`transition-transform duration-1000 ${
        start ? "translate-x-4/5" : "translate-x-0"
      }`}
    >
      <Image
        src={rabbits}
        alt="loading_rabbit"
        width={32}
        height={32}
        className="md:w-12 md:h-13 "
        unoptimized
      />
    </div>
  );
};

const ScheduleRabbit = ({ level }: { level: number }) => {
  return (
    <>
      <div className="flex flex-row gap-2 mt-5 mx-5 ">
        <ScheduleLoadingRabbits level={level} />
      </div>
    </>
  );
};

export default ScheduleRabbit;

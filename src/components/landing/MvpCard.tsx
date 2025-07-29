"use client";

import Image from "next/image";
import { StaticImageData } from "next/image";

interface MvpCardProps {
  title: string;
  description: string[];
  imageSrc: StaticImageData;
}

const MvpCard = ({ title, description, imageSrc }: MvpCardProps) => {
  return (
    <div>
      <div className="w-[300px] h-[450px] flex flex-col items-center transition-transform duration-300 ease-in-out">
        <div
          className={`relative w-[270px] h-[300px] flex justify-center items-center rounded-[20px] overflow-hidden `}
        >
          <Image
            src={imageSrc}
            alt={title}
            width={240}
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="mt-4 text-center px-2">
          <div className="font-semibold text-xl text-[color:var(--color-black)]">
            {title}
          </div>
          <div className="text-sm text-[color:var(--color-gray)] mt-2">
            {description.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MvpCard;

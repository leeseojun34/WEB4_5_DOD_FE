"use client";
import Image from "next/image";
import blue from "@/assets/images/profile_pastel_blue.png";
import black from "@/assets/images/profile_black.png";
import green from "@/assets/images/profile_green.png";
import navy from "@/assets/images/profile_navy.png";
import orange from "@/assets/images/profile_orange.png";
import pink from "@/assets/images/profile_pink.png";
import purple from "@/assets/images/profile_purple.png";
import white from "@/assets/images/profile_white.png";
import yellow from "@/assets/images/profile_yellow.png";
import pastel_black from "@/assets/images/profile_pastel_black.png";
import pastel_blue from "@/assets/images/profile_pastel_blue.png";
import pastel_gray from "@/assets/images/profile_pastel_gray.png";
import pastel_green from "@/assets/images/profile_pastel_green.png";
import pastel_orange from "@/assets/images/profile_pastel_orange.png";
import pastel_purple from "@/assets/images/profile_pastel_purple.png";
import pastel_red from "@/assets/images/profile_pastel_red.png";
import pastel_skyblue from "@/assets/images/profile_pastel_skyblue.png";

import { Pen, Shuffle } from "lucide-react";
import { useState } from "react";

const profiles = [
  blue,
  black,
  green,
  navy,
  orange,
  pink,
  purple,
  white,
  yellow,
  pastel_black,
  pastel_blue,
  pastel_gray,
  pastel_green,
  pastel_orange,
  pastel_purple,
  pastel_red,
  pastel_skyblue,
];

const Profile = ({ editHandler }: { editHandler: () => void }) => {
  const [currentProfile, setCurrentProfile] = useState(profiles[0]);
  function onChangeProfile() {
    const idx = Math.floor(Math.random() * profiles.length);
    setCurrentProfile(profiles[idx]);
  }
  return (
    <div className="w-full flex flex-col justify-between items-center gap-4">
      <div className="flex relative w-[76px] h-[84px]">
        <Image src={currentProfile} alt="사용자 프로필 이미지" fill />
        <button
          onClick={onChangeProfile}
          className="absolute bottom-0 right-0 z-10 cursor-pointer">
          <div className="flex justify-center items-center rounded-full w-[22px] h-[22px] p-1 bg-[color:var(--color-primary-400)]">
            <Shuffle className=" text-[color:var(--color-white)]" />
          </div>
        </button>
      </div>
      <div className="w-full flex flex-col justify-between items-center ">
        <div className="flex justify-between items-center gap-1.5">
          <span className="text-sm font-medium text-[color:var(--color-black)]">
            블랙 토끼수
          </span>
          <span onClick={editHandler}>
            <Pen
              size={12}
              className="text-[var(--color-gray)] hover:text-[var(--color-primary-400)] cursor-pointer"
            />
          </span>
        </div>
        <div className="text-xs font-normal text-[color:var(--color-gray-placeholder)]">
          sucoding@gmail.com
        </div>
      </div>
    </div>
  );
};
export default Profile;

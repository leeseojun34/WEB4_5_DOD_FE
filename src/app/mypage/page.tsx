"use client";

import Schedule from "@/components/feature/Schedule";
import ListBox from "@/components/mypage/ListBox";
import Profile from "@/components/mypage/Profile";
import BottomSheet from "@/components/ui/BottomSheet";
import BottomsheetSearchPlace from "@/components/ui/BottomsheetSearchPlace";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Search, X } from "lucide-react";
import { useState } from "react";

const mypage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sheetType, setSheetType] = useState<
    "name" | "time" | "station" | "calendar" | null
  >(null);
  const [text, setText] = useState("");

  const saveHandler = () => {
    setIsOpen(false);
  };

  const dateUpdateHandler = () => {
    setSheetType("time");
    setIsOpen(true);
  };
  const stationUpdateHandler = () => {
    setSheetType("station");
    setIsOpen(true);
  };
  const calendarUpdateHandler = () => {
    setSheetType("calendar");
    setIsOpen(true);
  };

  return (
    <div className="w-full flex flex-col py-8">
      <div className="flex flex-1 flex-col justify-between gap-[4vh]">
        <div className="flex flex-col gap-8">
          <Profile
            editHandler={() => {
              setSheetType("name");
              setIsOpen(true);
            }}
          />
          <div className="flex flex-col gap-4">
            <ListBox clickHandler={dateUpdateHandler}>가능한 시간</ListBox>
            <ListBox station="고덕역" clickHandler={stationUpdateHandler}>
              내 주변역
            </ListBox>
            <ListBox clickHandler={calendarUpdateHandler}>캘린더 연동</ListBox>
          </div>
        </div>
        <div className="flex justify-center items-center text-xs gap-24">
          <span className="font-light text-[var(--color-gray-placeholder)] hover:text-[var(--color-primary-400)] cursor-pointer">
            계정탈퇴
          </span>
          <span className="font-light text-[var(--color-gray-placeholder)] hover:text-[var(--color-primary-400)] cursor-pointer">
            로그아웃
          </span>
        </div>
      </div>

      {sheetType === "name" && (
        <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen} snapPoints={350}>
          <div className="w-full flex flex-col px-5 gap-8 pb-12">
            <div className="flex justify-between items-center px-5">
              <X className="invisible" />
              <span className="text-base font-medium mt-3">이름 수정</span>
              <X
                size={20}
                onClick={() => setIsOpen(false)}
                className="text-[var(--color-black)] cursor-pointer"
              />
            </div>
            <Input
              label="이름"
              value={text}
              maxLength={10}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setText(e.target.value)
              }
              placeholder="이름을 입력해주세요."
            />
            <div className="flex justify-between items-center">
              <Button onClick={saveHandler}>저장하기</Button>
            </div>
          </div>
        </BottomSheet>
      )}
      {sheetType === "time" && (
        <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen} snapPoints={900}>
          <div className="w-full h-full flex flex-col gap-8 pb-12">
            <div className="flex justify-between items-center px-5">
              <X className="invisible" />
              <span className="text-base font-medium mt-3">
                나의 가능한 시간
              </span>
              <X
                size={20}
                onClick={() => setIsOpen(false)}
                className="text-[var(--color-black)] cursor-pointer"
              />
            </div>
            <div className="w-full flex-1 overflow-y-auto ">
              <Schedule />
            </div>
            <div className="flex justify-between items-center px-5">
              <Button onClick={saveHandler}>저장하기</Button>
            </div>
          </div>
        </BottomSheet>
      )}
      {sheetType === "station" && (
        // <BottomsheetSearchPlace
        //   isOpen={isOpen}
        //   setIsOpen={setIsOpen}
        //   snapPoints={800}>
        //   역찾기
        // </BottomsheetSearchPlace>
        <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen} snapPoints={400}>
          <div className="w-full flex flex-col px-5 gap-8 pb-12">
            <div className="flex justify-between items-center ">
              <X className="invisible" />
              <span className="text-base font-medium mt-3">역찾기</span>
              <X
                size={20}
                onClick={() => setIsOpen(false)}
                className="text-[var(--color-black)] cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                value={text}
                icon={<Search className="w-4 h-4" />}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setText(e.target.value)
                }
                placeholder="가까운 지하철을 검색해주세요."
              />
              {/* SearchPlaceList */}
              <div className="w-full flex flex-col gap-2 rounded-lg bg-[var(--color-white)] hover:bg-[var(--color-muted)] px-6 py-2.5">
                <div className="text-[var(--color-black)] text-sm font-medium">
                  건대입구역
                </div>
                <div className="text-[var(--color-gray-placeholder)] text-xs font-medium">
                  서울특별시 광진구 화양동
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Button onClick={saveHandler}>저장하기</Button>
            </div>
          </div>
        </BottomSheet>
      )}
    </div>
  );
};
export default mypage;

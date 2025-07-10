"use client";

import Schedule from "@/components/feature/Schedule";
import BaseSheet from "@/components/mypage/BaseSheet";
import ListBox from "@/components/mypage/ListBox";
import NameSheet from "@/components/mypage/NameSheet";
import Profile from "@/components/mypage/Profile";
import SearchPlaceList from "@/components/mypage/SearchPlaceList";
import StationSheet from "@/components/mypage/StationSheet";
import TimeSheet from "@/components/mypage/TimeSheet";
import BottomSheet from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Search, X } from "lucide-react";
import { ChangeEvent, useState } from "react";

type SheetType = "name" | "time" | "station" | "calendar";

function MyPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [sheetType, setSheetType] = useState<SheetType | null>(null);
  const [text, setText] = useState("");

  const openSheet = (type: SheetType) => {
    setSheetType(type);
    setIsOpen(true);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleStationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // 추가 저장 로직 필요
  const saveHandler = () => setIsOpen(false);

  return (
    <div className="w-full flex flex-col py-8">
      <div className="flex flex-1 flex-col justify-between gap-[4vh]">
        <div className="flex flex-col gap-8">
          <Profile editHandler={() => openSheet("name")} />

          <div className="flex flex-col gap-4">
            <ListBox clickHandler={() => openSheet("time")}>
              가능한 시간
            </ListBox>
            <ListBox station="고덕역" clickHandler={() => openSheet("station")}>
              내 주변역
            </ListBox>
            <ListBox clickHandler={() => openSheet("calendar")}>
              캘린더 연동
            </ListBox>
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
      {/* 이름 수정하기 */}
      {sheetType === "name" && (
        <NameSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          text={text}
          onChange={handleNameChange}
          onSave={() => {
            /* 이름 저장 로직 추가*/
            saveHandler();
          }}
        />
      )}

      {/* 나의 가능한 시간 설정하기 */}
      {sheetType === "time" && (
        <TimeSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onSave={() => {
            /* 시간 저장 로직 추가 */
            saveHandler();
          }}
        />
      )}

      {/* 주변역 등록하기 */}
      {sheetType === "station" && (
        <StationSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          text={text}
          onChange={handleStationChange}
          onSave={() => {
            // 지하철역 저장 로직 추가
            saveHandler();
          }}
        />
        // <BaseSheet
        //   isOpen={isOpen}
        //   setIsOpen={setIsOpen}
        //   onSave={saveHandler}
        //   snapPoints={480}
        //   title="내 주변역 등록하기"
        //   showCloseIcon={true}>
        //   <div className="flex flex-col gap-4 ">
        //     <Input
        //       value={text}
        //       icon={<Search className="w-4 h-4" />}
        //       onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        //         setText(e.target.value)
        //       }
        //       placeholder="가까운 지하철을 검색해주세요."
        //     />
        //     {/* SearchPlaceList */}
        //     {/* <div className="w-full max-h-[200px] overflow-y-auto"> */}
        //     <div className="w-full flex-1 overflow-y-auto ">
        //       <SearchPlaceList
        //         stationName="서울역"
        //         stationAddress="서울역 중구 퇴게로"
        //       />
        //       <SearchPlaceList
        //         stationName="서울역"
        //         stationAddress="서울역 중구 퇴게로"
        //       />
        //     </div>
        //   </div>
        // </BaseSheet>
      )}
    </div>
  );
}
export default MyPage;

"use client";

import ListBox from "@/components/mypage/ListBox";
import NameSheet from "@/components/mypage/NameSheet";
import Profile from "@/components/mypage/Profile";
import StationSheet from "@/components/mypage/StationSheet";
import TimeSheet from "@/components/mypage/TimeSheet";
import AlertBox from "@/components/ui/AlertBox";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

type SheetType = "name" | "time" | "station" | "calendar";

function MyPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [sheetType, setSheetType] = useState<SheetType | null>(null);
  const [text, setText] = useState("");

  const router = useRouter();

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

  const handleLeave = () => {
    console.log("탈퇴누름");
    router.push("/");
  };
  const handleLogout = () => {
    console.log("로그아웃누름");
    router.push("/");
  };

  // 추가 저장 로직 필요
  const saveHandler = () => setIsOpen(false);

  return (
    <div className="w-full flex flex-col py-8">
      <div className="flex flex-1 flex-col justify-between gap-[4vh]">
        <div className="flex flex-col gap-8">
          <Profile editHandler={() => openSheet("name")} />

          <div className="flex flex-col gap-4">
            <ListBox buttonText="수정" clickHandler={() => openSheet("time")}>
              가능한 시간
            </ListBox>
            <ListBox
              buttonText="등록"
              station="고덕역"
              clickHandler={() => openSheet("station")}>
              내 주변역
            </ListBox>
            <ListBox buttonText="" clickHandler={() => openSheet("calendar")}>
              캘린더 연동
            </ListBox>
          </div>
        </div>

        <div className="flex justify-center items-center text-xs gap-24">
          <AlertBox
            actionHandler={handleLeave}
            content="탈퇴하시겠습니까?"
            cancel="취소"
            action="탈퇴">
            <span className="font-light text-[var(--color-gray-placeholder)] hover:text-[var(--color-primary-400)] cursor-pointer">
              계정탈퇴
            </span>
          </AlertBox>
          <AlertBox
            actionHandler={handleLogout}
            content="로그아웃하시겠습니까?"
            cancel="취소"
            action="로그아웃">
            <span className="font-light text-[var(--color-gray-placeholder)] hover:text-[var(--color-primary-400)] cursor-pointer">
              로그아웃
            </span>
          </AlertBox>
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
      )}
    </div>
  );
}
export default MyPage;

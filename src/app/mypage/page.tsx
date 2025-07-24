"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/lib/api/userApi";
import { kakaoSearch } from "@/types/kakaoSearch";

import Profile from "@/components/mypage/Profile";
import ListBox from "@/components/mypage/ListBox";
import NameSheet from "@/components/mypage/NameSheet";
import TimeSheet from "@/components/mypage/TimeSheet";
import StationSheet from "@/components/mypage/StationSheet";
import AlertBox from "@/components/ui/AlertBox";

import {
  useAddFavoriteLocation,
  useDeactiveMutation,
  useFavoriteLocation,
  useLogoutMutation,
  useResgisterCalendarId,
  useUpdateFavoriteLocation,
  useUpdateName,
  useUpdateProfileImg,
} from "@/lib/api/authApi";
import GoogleCalenaderSheet from "@/components/mypage/GoogleCalendarSheet";

type SheetType = "name" | "time" | "station" | "calendar";

function MyPage() {
  const { data: user, refetch } = useUser();
  // console.log(user.data);
  const [name, setName] = useState(user?.data.name);
  const [newName, setNewName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sheetType, setSheetType] = useState<SheetType | null>(null);
  const [calendarSynced, setCalendarSynced] = useState(false);
  // 즐겨찾기 장소 조회
  const { data: favoriteQuery } = useFavoriteLocation();
  const [myStation, setMyStation] = useState(favoriteQuery?.stationName);
  const [calendarId, setCalendarId] = useState("");

  useEffect(() => {
    refetch(); // 마운트 시 user 데이터 패치
  }, [refetch]);

  useEffect(() => {
    if (user) {
      setName(user.data.name);
      setMyStation(favoriteQuery?.stationName);
      console.log("my station :", favoriteQuery?.stationName);
    }
  }, [user, favoriteQuery]);

  // 즐겨찾는 시간 조회
  // const favoriteTime = useFavoriteTime();
  // console.log(favoriteTime.data);
  // const [time, setTime] = useState(()=> favoriteTime);

  const openSheet = (type: SheetType) => {
    setSheetType(type);
    setIsOpen(true);
    // console.log("bottomsheet:", type);
  };

  const updateName = useUpdateName();
  const handleNameSave = () => {
    updateName.mutate(newName, {
      onSuccess: () => {
        setName(newName);
        refetch();
        setIsOpen(false);
      },
    });
  };

  const updateProfileImg = useUpdateProfileImg();
  const handleRandomProfile = () => {
    updateProfileImg.mutate(undefined, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const addFavoriteLocation = useAddFavoriteLocation();
  const updateFavoriteLocation = useUpdateFavoriteLocation();

  const handleStationSave = (station: kakaoSearch) => {
    const stationName = station.place_name;
    const longitude = Number(station.x);
    const latitude = Number(station.y);
    const favoritePlaceId = Number(favoriteQuery?.favoriteLocationId);

    if (favoritePlaceId) {
      updateFavoriteLocation.mutate(
        { favoritePlaceId, stationName, latitude, longitude },
        {
          onSuccess: (res) => {
            const updated = res.data?.stationName || stationName;
            setMyStation(updated);
          },
        }
      );
    } else {
      addFavoriteLocation.mutate(
        { stationName, latitude, longitude },
        {
          onSuccess: (res) => {
            const createdName = res.data?.stationName || stationName;
            setMyStation(createdName);
          },
        }
      );
    }
    setIsOpen(false);
  };

  // 캘린더 연동
  const calendarMutation = useResgisterCalendarId();
  const handleGoogleCalendar = () => {
    calendarMutation.mutate(calendarId);
    setCalendarSynced((prev) => !prev);
    setIsOpen(false);
  };

  const logoutMutation = useLogoutMutation();
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const deactivateMutation = useDeactiveMutation();
  const handleLeave = () => {
    deactivateMutation.mutate();
  };

  return (
    <div className="w-full flex flex-col py-8">
      <div className="flex flex-1 flex-col justify-between gap-[4vh]">
        <div className="flex flex-col gap-8">
          {user?.data && (
            <Profile
              name={name}
              email={user.data.email}
              profile={user.data.profileImageNumber}
              editHandler={() => openSheet("name")}
              onChangeProfile={handleRandomProfile}
            />
          )}

          <div className="flex flex-col gap-4">
            <ListBox
              buttonText="수정하기"
              clickHandler={() => openSheet("time")}>
              가능한 시간
            </ListBox>
            <ListBox
              buttonText="등록하기"
              station={myStation || "미등록"}
              clickHandler={() => openSheet("station")}>
              내 주변역
            </ListBox>
            <ListBox
              clickHandler={() => openSheet("calendar")}
              isConnected={calendarSynced}>
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

      {/* 이름 수정 */}
      {sheetType === "name" && (
        <NameSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          text={newName}
          onChange={(e) => setNewName(e.target.value)}
          onSave={handleNameSave}
        />
      )}

      {/* 시간 설정 */}
      {sheetType === "time" && (
        <TimeSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onSave={() => {
            // 시간 저장 로직
            setIsOpen(false);
          }}
        />
      )}

      {/* 주변역 등록 */}
      {sheetType === "station" && (
        <StationSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onSave={handleStationSave}
        />
      )}
      {sheetType === "calendar" && (
        <GoogleCalenaderSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onSave={handleGoogleCalendar}
          onChange={(e) => setCalendarId(e.target.value)}
          text={calendarId}
        />
      )}
    </div>
  );
}

export default MyPage;

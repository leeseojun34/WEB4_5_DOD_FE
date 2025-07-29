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
  useGoogleCalendarId,
  useLogoutMutation,
  useResgisterCalendarId,
  useUpdateFavoriteLocation,
  useUpdateName,
  useUpdateProfileImg,
} from "@/lib/api/authApi";
import GoogleCalenaderSheet from "@/components/mypage/GoogleCalendarSheet";
import { useRouter } from "next/navigation";
import Toast from "@/components/ui/Toast";

type SheetType = "name" | "time" | "station" | "calendar";

function MyPage() {
  const router = useRouter();

  const { data: user, refetch } = useUser();
  const [name, setName] = useState(user?.data.name);
  const [newName, setNewName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sheetType, setSheetType] = useState<SheetType | null>(null);

  const { data: favoriteQuery } = useFavoriteLocation();
  const [myStation, setMyStation] = useState(favoriteQuery?.stationName);
  const [calendarId, setCalendarId] = useState("");
  const { data: googleCalendar } = useGoogleCalendarId();
  const [hasGoogleCalendarId, setHasGoogleCalendarId] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(0);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (user) {
      setName(user.data.name);
      setMyStation(favoriteQuery?.stationName);
    } else {
      router.push("/auth/login");
      Toast("로그인이 필요합니다.");
    }
  }, [user, favoriteQuery, router]);

  useEffect(() => {
    if (googleCalendar) {
      setHasGoogleCalendarId(googleCalendar.calendarId ? true : false);
      setCalendarId(googleCalendar.calendarId || "");
    }
  }, [googleCalendar]);

  useEffect(() => {
    const updateOffset = () => {
      // iPhone SE 높이 568px, iPhone 14 Pro 844px 기준
      const h = window.innerHeight;
      setBottomOffset(h >= 844 ? 120 : 100);
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  const openSheet = (type: SheetType) => {
    setSheetType(type);
    setIsOpen(true);
  };

  const updateName = useUpdateName();
  const handleNameSave = () => {
    updateName.mutate(newName, {
      onSuccess: () => {
        setName(newName);
        refetch();
        setIsOpen(false);
        setNewName("");
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
    const address = station.road_address_name;
    const longitude = Number(station.x);
    const latitude = Number(station.y);
    const favoritePlaceId = Number(favoriteQuery?.favoriteLocationId);

    if (favoritePlaceId) {
      updateFavoriteLocation.mutate(
        { favoritePlaceId, stationName, latitude, longitude, address },
        {
          onSuccess: (res) => {
            const updated = res.data?.stationName || stationName;
            setMyStation(updated);
          },
        }
      );
    } else {
      addFavoriteLocation.mutate(
        { stationName, latitude, longitude, address },
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

  // 캘린더 등록
  const calendarMutation = useResgisterCalendarId();
  const handleGoogleCalendar = () => {
    calendarMutation.mutate(calendarId);
    setIsOpen(false);
    setCalendarId(calendarId);
  };

  const logoutMutation = useLogoutMutation();
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const deactivateMutation = useDeactiveMutation();
  const handleLeave = () => {
    deactivateMutation.mutate();
  };
  if (!user) {
    return null;
  }
  return (
    <div className="w-full flex flex-col min-h-screen relative py-8">
      <div className="flex flex-1 flex-col justify-between gap-[4vh]">
        <div className="flex flex-col gap-8">
          {user && (
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
              station={myStation}
              clickHandler={() => openSheet("station")}>
              내 주변역
            </ListBox>
            <ListBox
              clickHandler={() => openSheet("calendar")}
              hasGoogleCalendarId={hasGoogleCalendarId}>
              캘린더 연동
            </ListBox>
          </div>
        </div>

        <div
          className="fixed left-0 right-0 flex justify-center items-center text-xs gap-24 z-50"
          style={{ bottom: `${bottomOffset}px` }}>
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
          text={calendarId}
          hasGoogleCalendarId={hasGoogleCalendarId}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onSave={handleGoogleCalendar}
          onChange={(e) => setCalendarId(e.target.value)}
        />
      )}
    </div>
  );
}

export default MyPage;

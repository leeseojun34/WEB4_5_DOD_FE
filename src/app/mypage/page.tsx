"use client";

import ListBox from "@/components/mypage/ListBox";
import NameSheet from "@/components/mypage/NameSheet";
import Profile from "@/components/mypage/Profile";
import StationSheet from "@/components/mypage/StationSheet";
import TimeSheet from "@/components/mypage/TimeSheet";
import AlertBox from "@/components/ui/AlertBox";
import { useUser } from "@/hooks/useUser";
import { useAddFavoriteLocation, useCalendarSync, useDeactiveMutation, useLogoutMutation, useUpdateFavoriteLocation, useUpdateName } from "@/lib/api/authApi";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { kakaoSearch } from "@/types/kakaoSearch";
import { useMutation, useQuery, useQueryClient,  } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
import toast from "react-hot-toast";

type SheetType = "name" | "time" | "station";

function MyPage() {
  // const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  // console.log(user.data)
  
  const [isOpen, setIsOpen] = useState(false);
  const [sheetType, setSheetType] = useState<SheetType | null>(null);

  const favoriteQuery = useQuery({
    queryKey: ["favoriteLocation"],
    queryFn: async () => {
      const res = await axiosInstance.get("/favorite-location");
      const list = res.data.data;
      return list.length > 0
        ? list[0]
        : {stationName : "미등록"}
    },
   
  });

  const [name, setName] = useState<string>(() => user?.data.name ?? "사용자이름");
  const [newName, setNewName] = useState("")
  const [email, setEmail] = useState<string>(() => user?.data.email ?? "");
  const [profile, setProfile] = useState<number>(user?.data.profileImageNumber)
  const [myStation, setMyStation] = useState<string>(
    () => favoriteQuery.data?.stationName
  );
  const [calendarSynced, setCalendarSynced] = useState(false)

   useEffect(() => {
    if (user?.data) {
      setName(user.data.name);
      setEmail(user.data.email);
      setProfile(user.data.profileImageNumber)
    }
    
   }, [user]);
  
    useEffect(() => {
    if (favoriteQuery.data) {
      setMyStation(favoriteQuery.data.stationName);
      // console.log(favoriteQuery.data)
    }
  }, [favoriteQuery.data])
  
  
  const openSheet = (type: SheetType) => {
    setSheetType(type);
    setIsOpen(true);
  };



  const updateName = useUpdateName();
  const handleNameSave = () => {
   updateName.mutate(newName)
   if (updateName.isSuccess) {
    setName(newName)
   }
 }

  const addFavoriteLocation = useAddFavoriteLocation();
  const updateFavoriteLocation = useUpdateFavoriteLocation();


  const handleStationSave = (station: kakaoSearch) => {
    const stationName = station.place_name;
    const longitude = Number(station.x)
    const latitude = Number(station.y)
    const favoritePlaceId = Number(favoriteQuery.data?.favoriteLocationId)
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
  } 
  else {
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

  const calendarMutation = useCalendarSync();
  const handleGoogleCalendar = () => {
    calendarMutation.mutate();
    setCalendarSynced((prev) => !prev)
    
  }
  
    //로그아웃
  const logoutMutation = useLogoutMutation();
  const handleLogout = () => {
    console.log("로그아웃누름");
    logoutMutation.mutate();
  };
  //회원탈퇴
  const deactivateMutation = useDeactiveMutation();
  const handleLeave = () => {
    console.log("탈퇴누름");
    deactivateMutation.mutate();
  };


  


  return (
    <div className="w-full flex flex-col py-8">
      <div className="flex flex-1 flex-col justify-between gap-[4vh]">
        <div className="flex flex-col gap-8">
        <Profile name={name} email={email} profile={profile} editHandler={() => openSheet("name")} />

          <div className="flex flex-col gap-4">
            <ListBox buttonText="수정" clickHandler={() => openSheet("time")}>
              가능한 시간
            </ListBox>
            <ListBox
              buttonText="등록"
              station={myStation || "미등록"}
              clickHandler={() => openSheet("station")}>
              내 주변역
            </ListBox>
            <ListBox onConnect={handleGoogleCalendar} isConnected={calendarSynced} >
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
          text={newName}
          onChange={e => setNewName(e.target.value)}
          onSave={handleNameSave}
        />
      )}

      {/* 나의 가능한 시간 설정하기 */}
      {sheetType === "time" && (
         <TimeSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onSave={() => {/* 시간 저장 로직 */ setIsOpen(false);}}
        />
      )}

      {/* 주변역 등록하기 */}
      {sheetType === "station" && (
       <StationSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onSave={handleStationSave}
        />
      )}
    </div>
  );
}
export default MyPage;

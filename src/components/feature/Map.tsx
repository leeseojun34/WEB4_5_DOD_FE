"use client";
import { useEffect, useRef } from "react";
import ping from "@/assets/images/pin_red_rabbit.png";

const KAKAO_MAP_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

type MapProps = {
  latitude?: number; // 위도 (선택, 기본값 제공)
  longitude?: number; // 경도 (선택, 기본값 제공)
};

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = ({ latitude = 37.4849424, longitude = 127.0106459 }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current || !KAKAO_MAP_API_KEY)
      return;

    if (document.getElementById("kakao-map-script")) {
      if (window.kakao && window.kakao.maps) {
        initializeMap();
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "kakao-map-script";
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        initializeMap();
      });
    };
    document.head.appendChild(script);

    const initializeMap = () => {
      if (!mapRef.current) return;

      // 지도 생성
      const mapContainer = mapRef.current;
      const mapOption = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      // 마커 이미지 설정
      const imageSize = new window.kakao.maps.Size(40, 56); // ping 이미지 크기
      const imageOption = { offset: new window.kakao.maps.Point(20, 56) }; // 중심과 일치시킬 좌표
      const markerImage = new window.kakao.maps.MarkerImage(
        ping.src,
        imageSize,
        imageOption
      );

      // 마커 위치 및 생성
      const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      // 마커 지도에 추가
      marker.setMap(map);
    };
  }, [latitude, longitude]);

  return <div ref={mapRef} style={{ width: "375px", height: "800px" }} />;
};
export default Map;

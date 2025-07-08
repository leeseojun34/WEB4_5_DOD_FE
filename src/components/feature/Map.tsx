"use client";
import { useEffect, useRef } from "react";
import ping from "@/assets/images/pin_red_rabbit.png";

const KAKAO_MAP_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

type MapProps = {
  latitude?: number;
  longitude?: number;
  showMarker?: boolean;
};

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = ({
  latitude = 37.4849424,
  longitude = 127.0106459,
  showMarker = true,
}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current || !KAKAO_MAP_API_KEY)
      return;

    const initializeMap = () => {
      if (!mapRef.current) return;

      const mapContainer = mapRef.current;
      const mapOption = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      if (showMarker) {
        const imageSize = new window.kakao.maps.Size(40, 56);
        const imageOption = { offset: new window.kakao.maps.Point(20, 56) };
        const markerImage = new window.kakao.maps.MarkerImage(
          ping.src,
          imageSize,
          imageOption
        );
        const markerPosition = new window.kakao.maps.LatLng(
          latitude,
          longitude
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });
        marker.setMap(map);
      }
    };

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
  }, [latitude, longitude, showMarker]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};
export default Map;

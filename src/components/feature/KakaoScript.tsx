"use client";

import Script from "next/script";

function KakaoScript() {
  const onLoad = () => {
    const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
    if (kakaoKey) {
      window.Kakao.init(kakaoKey);
    }
  };

  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.js"
      async
      onLoad={onLoad}
    />
  );
}

export default KakaoScript;

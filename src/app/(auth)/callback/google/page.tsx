"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GoogleCallback = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch(
          "https://ittaeok.cedartodo.uk/oauth2/authorization/google",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              provider: "GOOGLE",
              providerId: "GOOGLE",
              authorizationCode: code,
              accessToken: "",
              refreshToken: "",
            }),
          }
        );
        const data = await res.json();
        localStorage.setItem("accessToken", data.accessToken);
        router.push("/");
      } catch (e) {
        console.error("구글 로그인 실패", e);
      }
    };
    fetchToken();
  }, [code, router]);
  return <p>Google 로그인 처리 중...</p>;
};
export default GoogleCallback;

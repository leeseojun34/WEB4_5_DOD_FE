const searchDestination = async (inputValue: string) => {
  const url = new URL(
    "https://dapi.kakao.com/v2/local/search/keyword.${FORMAT}"
  );
  url.searchParams.set("query", inputValue);
  url.searchParams.set("size", "5");

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  if (!res.ok) throw new Error("목적지 검색 실패");
  return res.json();
};

export default searchDestination;

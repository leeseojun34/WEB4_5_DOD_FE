export const searchSubwayStation = async (
  query: string,
  REST_API_KEY: string
) => {
  const url = new URL(
    "https://dapi.kakao.com/v2/local/search/keyword.${FORMAT}"
  );
  url.searchParams.set("query", query);
  url.searchParams.set("category_group_code", "SW8");
  url.searchParams.set("size", "5");

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `KakaoAK ${REST_API_KEY}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  if (!res.ok) throw new Error("실패!!!!!!!!!!!!");
  return res.json();
};

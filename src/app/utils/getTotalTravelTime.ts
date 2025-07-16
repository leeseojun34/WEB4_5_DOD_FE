type Coord = {
  x: number;
  y: number;
};

const getTotalTravelTime = async (from: Coord, to: Coord): Promise<number> => {
  const key = process.env.NEXT_PUBLIC_ODSAY_API_KEY;
  if (!key) throw new Error("Need Key");
  const url = `https://api.odsay.com/v1/api/searchPubTransPathT?SX=${from.x}&SY=${from.y}&EX=${to.x}&EY=${to.y}&searchPathType=1&apiKey=${key}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("fail to road api");

  const json = await res.json();
  if (!json?.result?.path?.length) throw new Error("경로 정보 없음");

  const totalTime = json.result.path[0].info.totalTime;
  if (typeof totalTime !== "number") throw new Error("시간 정보 없음");

  return totalTime;
};

export default getTotalTravelTime;

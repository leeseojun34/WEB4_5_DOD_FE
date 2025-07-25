export const calculateParticipantion = (num: number, total: number) => {
  const calc = (num / total) * 100;
  return calc.toFixed(0);
};

export const getLocationFrequencies = (
  groupSchedules: { count: number; location: string | null }[]
) => {
  const sortedData = groupSchedules
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  return mapLocationData(sortedData);
};

export const mapWeekdayData = (
  weekdayArray: { weekDay: string; count: number }[]
) => {
  const weekdayMap: { [key: string]: string } = {
    MONDAY: "월",
    TUESDAY: "화",
    WEDNESDAY: "수",
    THURSDAY: "목",
    FRIDAY: "금",
    SATURDAY: "토",
    SUNDAY: "일",
  };

  const result: { [key: string]: number } = {};

  weekdayArray.forEach((item) => {
    const koreanDay = weekdayMap[item.weekDay];
    if (koreanDay) {
      result[koreanDay] = item.count;
    }
  });

  return result;
};

export const mapLocationData = (
  locationArray: { location: string | null; count: number }[]
) => {
  const sortedArray = locationArray.sort((a, b) => b.count - a.count);

  const locations = sortedArray.map((item) => item.location || "기타");
  const counts = sortedArray.map((item) => item.count);

  return {
    locations,
    counts,
  };
};

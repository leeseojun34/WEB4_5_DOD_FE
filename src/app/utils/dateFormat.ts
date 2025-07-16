/**
 * 날짜 포맷팅
 * @param date 날짜
 * @returns 날짜 포맷팅
 */
export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}` as unknown as number;
  }
  if (day < 10) {
    day = `0${day}` as unknown as number;
  }

  return `${year}-${month}-${day}`;
};

/**
 * 시간 포맷팅
 * @param date 시간
 * @returns 시간 포맷팅
 */
export const formatTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
};

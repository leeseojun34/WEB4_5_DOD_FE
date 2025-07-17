/**
 * 16진수 비트 값을 시간 배열로 변환
 * @param hexBit 16진수 비트 값 (ex: "000003FC0000")
 * @returns 시간 배열
 */
export const convertHexBitToTimes = (hexBit: string) => {
  const decimal = parseInt(hexBit, 16);
  const binary = decimal.toString(2).padStart(48, "0");
  const times = [];

  for (let i = 0; i < 48; i++) {
    if (binary[47 - i] === "1") {
      const hour = Math.floor(i / 2);
      const minute = (i % 2) * 30;
      times.push(
        `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`
      );
    }
  }
  return times;
};

/**
 * 시간 배열을 16진수 비트 값으로 변환
 * @param times 시간 배열 (ex: ["09:00", "09:30", ...])
 * @returns 16진수 비트 값
 */
export const convertTimesToHexBit = (times: string[]) => {
  const binaryArray = Array(48).fill("0");

  times.forEach((time) => {
    const [hourStr, minuteStr] = time.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const index = hour * 2 + (minute >= 30 ? 1 : 0);
    const bitPosition = 47 - index;
    binaryArray[bitPosition] = "1";
  });

  const binaryStr = binaryArray.join("");
  const decimal = parseInt(binaryStr, 2);
  const hex = decimal.toString(16).toUpperCase().padStart(12, "0");
  return hex;
};

/**
 * 16진수 비트 값을 시간 테이블로 변환
 * @param timeSlots 시간 슬롯 배열
 * @returns 시간 테이블
 */
export const convertHexBitToTimeTable = (timeSlots: EventTimeMemberType) => {
  console.log(timeSlots);
};

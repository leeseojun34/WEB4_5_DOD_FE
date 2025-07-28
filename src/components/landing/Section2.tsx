"use client";

import Image from "next/image";
import SectionLayout from "./SectionLayout";
import iphoneImage from "@/assets/images/iphone_image.png";
import TextMessage from "./TextMessage";

const Section2 = () => {
  
  const messages = [
    { text: "우리 언제 만나", isMine: true, characterIndex: 1 },
    { text: "되는 시간 언제야?", isMine: false, characterIndex: 5 },
    { text: "난 수요일 가능", isMine: false, characterIndex: 3 },
    {
      text: "헐 난 수요일 안됨 ㅠㅠ 목요일은?",
      isMine: true,
      characterIndex: 1,
    },
    { text: "목요일은 내가 안돼", isMine: false, characterIndex: 4 },
    { text: "그럼 다음에 봐야겠네", isMine: true, characterIndex: 1 },
  ];
  return (
    <SectionLayout bgColor="blue" sectionNum="section2">
      <div className="flex flex-col gap-9">
        <div className="font-bold text-[color:var(--color-white)] text-[28px] text-center ">
          스케쥴 잡다가
          <br /> 시간 다 간 적 있나요?
        </div>
        <div className="text-xs text-[color:var(--color-white)] text-center leading-6">
          💬 단톡방에서 끝없는 시간 조율…
          <br />
          🤯 시간, 장소, 링크 따로 관리하느라 정신없다면?
        </div>
        <div className="relative">
          <Image src={iphoneImage} alt="아이폰 이미지" />

          <div className="absolute top-16 left-0 right-0 flex flex-col items-center gap-3">
            {messages.map((msg, index) => (
              <TextMessage
                key={index}
                text={msg.text}
                isMine={msg.isMine}
                characterIndex={msg.characterIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};
export default Section2;

import rabbitWriting from "@/assets/images/rabbit_writing.png";
import Image from "next/image";

const UserSchedule = () => {
  return (
    <div className="min-w-[375px] min-h-screen bg-[color:var(--color-gray-background)] px-5">
      <Image src={rabbitWriting} alt="글쓰는 토끼 이미지" />
      <div></div>
    </div>
  );
};
export default UserSchedule;

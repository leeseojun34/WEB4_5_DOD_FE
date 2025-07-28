import notFoundPhoto from "@/assets/images/404_not_found.png";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Header from "@/components/layout/Header";

const NotFound = () => {
  return (
    <>
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="flex flex-col justify-center items-center h-screen bg-[color:var(--color-primary-100)]">
        <div className="flex flex-col items-center justify-between ">
          <div className="w-full justify-center flex flex-col gap-6 text-center">
            <strong className="font-[TTTogether] text-[color:var(--color-primary-400)] text-8xl">
              OOPS!
            </strong>
            <div className="text-[color:var(--color-gray-placeholder)]">
              <p>토끼가 이상한 굴에 들어갔나봐요</p>
              <p>요청하신 페이지를 찾을 수 없어요</p>
            </div>
          </div>
          <div className="w-full h-full flex justify-center items-center mt-20">
            <Image
              src={notFoundPhoto}
              alt="404"
              width={360}
              height={240}
              unoptimized
            />
          </div>
          <div className="absolute w-full bottom-9 px-5  flex justify-center items-center">
            <Button>
              <Link href="/">안전한 굴로 이동하기</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default NotFound;

import notFoundPhoto from "@/assets/images/404_losthome.png";
import notFoundPhoto2 from "@/assets/images/404_number.png";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <div className="">
            <Image src={notFoundPhoto2} alt="404"></Image>
          </div>
          <div className="w-full h-full flex justify-center items-center">
            <Image src={notFoundPhoto} alt="404" width={284} height={284} />
          </div>
        </div>
        <div className="w-full p-5">
          <Link href="/">
            <Button>홈으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default NotFound;

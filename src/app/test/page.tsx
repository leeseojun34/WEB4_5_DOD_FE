import { OptionBox } from "@/components/ui/OptionBox";
import Image from "next/image";
import notebook from "@/assets/images/schedule_notebook.png";
import backpack from "@/assets/images/schedule_backpack.png";

export default function page() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center px-5 gap-10">
      {/* <Bubble size="lg">
        대나무 행주 모임이
        <br />
        생성되었습니다 🎉
      </Bubble> */}
      <div className="w-full flex gap-5">
        <OptionBox isSelected={true}>
          <Image src={notebook} alt="노트북" width={52} />
          온라인
        </OptionBox>
        <OptionBox isSelected={false}>
          <Image src={backpack} alt="책가방" width={52} />
          오프라인
        </OptionBox>
      </div>

      <div className="w-full flex flex-col gap-4">
        <OptionBox isSelected={false}>
          <p>왕십리역</p>
          <p className="text-sm font-light">이동 시간 : 47분</p>
        </OptionBox>
        <OptionBox isSelected={true}>
          <p>잠실역</p>
          <p className="text-sm font-light">이동 시간 : 47분</p>
        </OptionBox>
        <OptionBox isSelected={false}>
          <p>동대문역사문화공원역</p>
          <p className="text-sm font-light">이동 시간 : 47분</p>
        </OptionBox>
      </div>
    </div>
  );
}

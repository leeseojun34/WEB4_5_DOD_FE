import { OptionBox } from "@/components/ui/OptionBox";
import thunder from "@/assets/images/schedule_lightening.png";
import cloud from "@/assets/images/schedule_cloud.png";
import Image from "next/image";

const MeetingTypeOptions = () => {
  return (
    <div className="flex gap-5">
      <OptionBox isSelected={true}>
        <Image src={thunder} alt="번개" width={52} />
        한번
        <br />
        모임
      </OptionBox>
      <OptionBox isSelected={false}>
        <Image src={cloud} alt="구름" width={52} />
        자주
        <br />
        모임
      </OptionBox>
    </div>
  );
};
export default MeetingTypeOptions;

"use client";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

interface MeetingTypeChoiceButtonProps {
  selectedType: string;
}

const MeetingTypeChoiceButton = ({
  selectedType,
}: MeetingTypeChoiceButtonProps) => {
  const router = useRouter();
  const handleNext = () => {
    if (selectedType === "once") {
      router.push("/schedule/create");
    } else {
      router.push("/group/create");
    }
  };
  return (
    <Button state="default" onClick={handleNext}>
      다음
    </Button>
  );
};
export default MeetingTypeChoiceButton;

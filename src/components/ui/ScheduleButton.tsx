import { Button } from "@/components/ui/Button";

const ScheduleButton = ({
  level,
  setLevel,
}: {
  level: number;
  setLevel: (level: number) => void;
}) => {
  return (
    <div className="my-8 mx-5">
      <Button onClick={() => setLevel(level + 1)}>다음</Button>
    </div>
  );
};
export default ScheduleButton;

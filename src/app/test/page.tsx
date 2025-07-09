import ScheduleItem from "@/components/ui/ScheduleItem";

export default function page() {
  return (
    <>
      <div className="min-h-screen w-full flex justify-center items-center px-5 bg-[color:var(--color-gray-background)]">
        <ScheduleItem
          name="카츠오모이가는날"
          type="온라인"
          time="7월 4일 (금) 18:00 - 22:00"
          members={["박준규", "박은서", "현혜주", "박상윤", "황수지"]}
        />
      </div>
    </>
  );
}

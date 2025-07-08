import { Calendar } from "@/components/feature/Calender";

export default function page() {
  const answeredDays = [
    new Date("2025-07-08"),
    new Date("2025-07-09"),
    new Date("2025-07-11"),
  ];
  return (
    <div className="flex min-h-screen justify-center items-center bg-black">
      <div className="w-40">
        <Calendar isCompact={true} />
      </div>
    </div>
  );
}

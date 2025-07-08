import { Calendar } from "@/components/feature/Calender";

export default function page() {
  return (
    <div className="flex min-h-screen justify-center items-center bg-black">
      <div className="w-40">
        <Calendar />
      </div>
    </div>
  );
}

"use client";

import { Calendar } from "@/components/feature/Calender";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export default function Page() {
  const [selected, setSelected] = useState<Date[] | undefined>([]);

  const answeredDays = [
    new Date("2025-07-08"),
    new Date("2025-07-09"),
    new Date("2025-07-11"),
  ];
  return (
    <div className="flex min-h-screen justify-center items-center bg-black">
      <div className="w-[335px] flex flex-col gap-12">
        <Calendar
          isCompact={true}
          selected={selected}
          setSelected={setSelected}
        />
        <Button onClick={() => console.log(selected)}>제출</Button>
      </div>
    </div>
  );
}

"use client";

import { Calendar } from "@/components/feature/calendar/Calender";
import { useState } from "react";

export default function Page() {
  const [selected, setSelected] = useState<Date[] | undefined>();

  const events = [
    new Date("2025-07-08"),
    new Date("2025-07-09"),
    new Date("2025-07-11"),
  ];
  return (
    <div className="flex min-h-screen justify-center items-center bg-black">
      <div className="w-[335px] flex flex-col gap-12">
        <Calendar
          isCompact={false}
          selected={selected}
          setSelected={setSelected}
          events={events}
        />
      </div>
    </div>
  );
}

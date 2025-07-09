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
    <div className="flex min-h-screen justify-center items-center bg-black px-5">
      <div className="w-full flex flex-col gap-12">
        <Calendar
          isCompact={true}
          selected={selected}
          setSelected={setSelected}
          events={events}
        />
      </div>
    </div>
  );
}

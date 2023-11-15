"use client";
import { useState } from "react";
import { Calendar } from "~/components/ui/calendar";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import TimePicker from "react-time-picker";

export default function Scheduler() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<Date | string | null>(new Date());

  return (
    <>
      <div className="ml-5 flex items-center justify-center text-white">
        <TimePicker value={time} onChange={setTime} />
      </div>
      <div className="mt-5 flex flex-col items-center justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border text-white"
        />
      </div>
    </>
  );
}

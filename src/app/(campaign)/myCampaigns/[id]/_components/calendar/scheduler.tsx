"use client";
import { type Dispatch, type SetStateAction, useState } from "react";
import { Calendar } from "~/components/ui/calendar";
import uuid from "react-uuid";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import TimePicker from "react-time-picker";
import { DialogTrigger } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { createCampaginScheduledEvent } from "../../actions";
import type { Campaign } from "@prisma/client";

export default function Scheduler(props: {
  campaignData: Campaign;
  setUpdateEvents: Dispatch<SetStateAction<boolean>>;
  setScheduledEventsState: (action: {
    id: string;
    campaignId: string;
    time: string;
    date: string;
    scheduledEvent: string;
  }) => void;
  setEventDaysState: (action: Date) => void;
}) {
  const {
    campaignData,
    setUpdateEvents,
    setScheduledEventsState,
    setEventDaysState,
  } = props;
  const [date, setDate] = useState<Date | undefined>();
  const [scheduledEvent, setScheduledEvent] = useState("");
  const [time, setTime] = useState<Date | string | null>();

  const handleScheduledEventChange = (e: string) => {
    setScheduledEvent(e);
  };

  const handleSetSchedule = async () => {
    if (
      date !== undefined &&
      time !== null &&
      scheduledEvent !== "" &&
      typeof time === "string"
    ) {
      setScheduledEventsState({
        id: uuid(),
        campaignId: campaignData.id,
        time: time,
        date: date.toUTCString(),
        scheduledEvent: scheduledEvent,
      });
      setEventDaysState(date);
      await createCampaginScheduledEvent({
        campaignId: campaignData.id,
        time: time,
        date: date.toUTCString(),
        scheduledEvent: scheduledEvent,
      });
      setUpdateEvents(false);
    }
  };

  return (
    <>
      <div className="mt-auto flex items-center justify-center">
        <div className="flex flex-col">
          <div className="flex items-center justify-center text-white">
            <TimePicker
              openClockOnFocus={false}
              value={time}
              onChange={setTime}
            />
          </div>
          <div className="mt-5 flex flex-col items-center justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border text-white"
            />
          </div>
          <div className="mt-5 flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-3">
              <label className="text-white">Event:</label>
              <Input
                className="mt-auto  border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
                id="scheduledEvent"
                name="scheduledEvent"
                value={scheduledEvent}
                onChange={(e) => handleScheduledEventChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSetSchedule;
                }}
              />
            </div>
            <DialogTrigger
              className="rounded-md bg-primary p-2 text-primary-foreground hover:bg-primary/90 "
              onClick={handleSetSchedule}
            >
              Confirm
            </DialogTrigger>
          </div>
        </div>
      </div>
    </>
  );
}

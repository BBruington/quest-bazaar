"use client";
import { useState } from "react";
import { Calendar } from "~/components/ui/calendar";
import { api } from "~/utils/trpc";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import TimePicker from "react-time-picker";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import type { Campaign } from "@prisma/client";

export default function Scheduler(props: { campaignData: Campaign }) {
  const { campaignData } = props;
  const [date, setDate] = useState<Date | undefined>();
  const [scheduledEvent, setScheduledEvent] = useState("");
  const [time, setTime] = useState<Date | string | null>();

  const { mutate: createCampaignEvent } =
    api.createCampaignScheduledEvent.useMutation();

  const handleScheduledEventChange = (e: string) => {
    setScheduledEvent(e);
  };

  const handleSetSchedule = () => {
    if (
      date !== undefined &&
      time !== null &&
      scheduledEvent !== "" &&
      typeof time === "string"
    ) {
      createCampaignEvent({
        campaignId: campaignData.id,
        time: time,
        date: date.toUTCString(),
        scheduledEvent: scheduledEvent,
      });
    }
  };

  return (
    <>
      
      <div className="mt-auto flex  items-center justify-center">
        <div className="flex flex-col">
          <div className="flex items-center justify-center text-white">
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
            <Button onClick={handleSetSchedule} className="">
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

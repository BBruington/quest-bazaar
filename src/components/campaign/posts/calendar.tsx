"use client";
import { useState } from "react";
import { Calendar } from "~/components/ui/calendar";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { api } from "~/utils/trpc";
import Scheduler from "./scheduler";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import type { Campaign } from "@prisma/client";

export default function CalendarComponent(props: { campaignData: Campaign }) {
  const { campaignData } = props;
  const [updateEvents, setUpdateEvents] = useState(false)
  const [allEvents, setAllevents] = useState([
    {
      id: "",
      campaignId: "",
      time: "",
      date: new Date(),
      scheduledEvents: "",
    },
  ]);
  const [eventDays, setEventDays] = useState<Date[]>([])
  const { data: scheduledEvents } = api.queryCampaignScheduledEvents.useQuery({
    campaignId: campaignData.id,
  });
  if (!scheduledEvents) return <div>failed to load events</div>;
  const allDates = scheduledEvents.map((eventDay) => {
    const newDate = new Date(eventDay.date);
    return newDate;
  });
  if( updateEvents === false) {
    setEventDays(allDates)
    setUpdateEvents(true)
  }

  return (
    <div className="flex flex-col items-center justify-center w-1/3">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-5" variant="outline">Set a Date</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-black">
          <DialogHeader>
            <DialogTitle className="text-white">Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to the calendar here to add scheduled events.
            </DialogDescription>
          </DialogHeader>
          <Scheduler campaignData={campaignData}/>
        </DialogContent>
      </Dialog>
      <div className="mt-auto flex w-1/2 items-center justify-center">
        <div className="flex flex-col">
          <div className="mt-5 flex flex-col items-center justify-center">
            <Calendar
              mode="multiple"
              selected={ eventDays ? eventDays : undefined}
              className="rounded-md border text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

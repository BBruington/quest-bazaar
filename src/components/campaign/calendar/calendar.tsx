"use client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Calendar } from "~/components/ui/calendar";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  const [updateEvents, setUpdateEvents] = useState(false);
  const [eventDays, setEventDays] = useState<Date[]>([]);
  const utils = api.useContext();
  const { data: scheduledEvents } = api.queryCampaignScheduledEvents.useQuery({
    campaignId: campaignData.id,
  });
  const deleteEvent = api.deleteCampaignScheduledEvent.useMutation({
    onSuccess: async () => {
      await utils.queryCampaignScheduledEvents.invalidate();
    },
  });

  if (!scheduledEvents) return <div>failed to load events</div>;
  const allDates = scheduledEvents.map((eventDay) => {
    const newDate = new Date(eventDay.date);
    return newDate;
  });
  if (updateEvents === false) {
    setEventDays(allDates);
    setUpdateEvents(true);
  }

  const handleDeleteSchedule = (eventId: string) => {
    deleteEvent.mutate({
      eventId,
    });
  };

  return (
    <div className="flex w-full space-x-5">
      <div className="flex w-1/3 flex-col items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-5" variant="outline">
              Set a Date
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-white">Set a Date</DialogTitle>
              <DialogDescription>
                Make changes to the calendar here to add scheduled events.
              </DialogDescription>
            </DialogHeader>
            <Scheduler campaignData={campaignData} />
          </DialogContent>
        </Dialog>
        {/* <div className="mt-auto flex  items-center justify-center"> */}
        <div className="flex flex-col">
          <div className="mt-5 flex flex-col items-center justify-center">
            <Calendar
              mode="multiple"
              selected={eventDays ? eventDays : undefined}
              className="rounded-md border text-white"
            />
          </div>
        </div>
      </div>
      {/* </div> */}
      <div className="flex flex-col space-y-5">
        {scheduledEvents.map((scheduledEvent) => (
          <div className="flex items-center space-x-4 border-white text-white border-b-2 " key={scheduledEvent.id}>
            <div className="flex flex-col">
              <div>{scheduledEvent.scheduledEvent}</div>
              <div>{scheduledEvent.date}</div>
              <div>{scheduledEvent.time}</div>
            </div>
            <Trash2 className="text-white hover:cursor-pointer hover:text-slate-200" onClick={() => handleDeleteSchedule(scheduledEvent.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

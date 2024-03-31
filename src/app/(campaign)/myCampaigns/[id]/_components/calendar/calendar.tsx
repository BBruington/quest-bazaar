"use client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Calendar } from "~/components/ui/calendar";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import Scheduler from "./scheduler";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { deleteCampaignScheduledEvent } from "../../actions";
import type { Campaign } from "../types";
import { CampaignSchedules } from "@prisma/client";

export default function CalendarComponent(props: { campaignData: Campaign, scheduledEvents: CampaignSchedules[] }) {
  const { campaignData, scheduledEvents } = props;
  const [updateEvents, setUpdateEvents] = useState(false);
  const [eventDays, setEventDays] = useState<Date[] | undefined>([]);
  const handleUpdatingCalendar = () => {
    if (updateEvents === true) {
      setUpdateEvents(!updateEvents);
    } else {
      const allDates = scheduledEvents.map((eventDay) => {
        const newDate = new Date(eventDay.date);
        return newDate;
      });
      setEventDays(allDates);
      setUpdateEvents(!updateEvents);
    }
  };

  if (updateEvents === false) {
    handleUpdatingCalendar();
  }

  const handleDeleteSchedule = async (scheduledEventId: CampaignSchedules["id"]) => {
    const response = await deleteCampaignScheduledEvent({
      scheduledEventId,
      campaignId: campaignData.id,
    });
    if(response?.status === "SUCCESS") {
      handleUpdatingCalendar();
    }
  };

  return (
    <>
      <div className="flex w-4/6 flex-col items-center self-center lg:self-start">
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
            <Scheduler
              campaignData={campaignData}
              setUpdateEvents={setUpdateEvents}
            />
            <DialogFooter></DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="flex flex-col">
          <div className="mt-5 flex flex-col items-center justify-center">
            <Calendar
              mode="multiple"
              selected={eventDays}
              className="rounded-md border text-white"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-col justify-center space-y-5 lg:mt-0 lg:w-1/6 lg:self-start">
        {scheduledEvents.map((scheduledEvent) => (
          <div
            className="flex flex-col items-center justify-center space-x-4 border-b-2 border-white text-white 2xl:flex-row "
            key={scheduledEvent.id}
          >
            <div className="flex flex-col">
              <div>{scheduledEvent.scheduledEvent}</div>
              <div>{scheduledEvent.date}</div>
              <div className="mt-1 flex justify-between">
                <div>
                  <div className="font-bold">{scheduledEvent.time}</div>
                </div>
                <Trash2
                  className="mr-5 flex text-white hover:cursor-pointer hover:text-slate-200"
                  onClick={() => handleDeleteSchedule(scheduledEvent.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

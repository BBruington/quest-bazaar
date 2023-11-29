"use client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Calendar } from "../../../components/ui/calendar";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { api } from "../../../utils/trpc";
import Scheduler from "./scheduler";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import type { Campaign} from "../types"

export default function CalendarComponent(props: { campaignData: Campaign }) {
  const { campaignData } = props;
  const [updateEvents, setUpdateEvents] = useState(false);
  const utils = api.useContext();
  const [eventDays, setEventDays] = useState<Date[] | undefined>([]);
  const { data: scheduledEvents } = api.queryCampaignScheduledEvents.useQuery({
    campaignId: campaignData.id,
  });
  const deleteEvent = api.deleteCampaignScheduledEvent.useMutation({
    onSuccess: async () => {
      await utils.queryCampaignScheduledEvents.invalidate().then(() => {
        handleUpdatingCalendar();
      });
    },
  });
  if (!scheduledEvents) return <div>failed to load events</div>;
  const handleUpdatingCalendar = () => {
    if (updateEvents === true) {
      setUpdateEvents(!updateEvents);
    } else {
      const allDates = scheduledEvents.map((eventDay) => {
        const newDate = new Date(eventDay.date);
        return newDate;
      });
      setEventDays(allDates);
      setUpdateEvents(!updateEvents)
    }
  };

  if (updateEvents === false) {
    handleUpdatingCalendar();
  }

  const handleDeleteSchedule = (eventId: string) => {
    deleteEvent.mutate({
      eventId,
    });
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
            <Scheduler campaignData={campaignData} setUpdateEvents={setUpdateEvents}/>
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
      <div className="flex lg:w-1/6 mt-5 lg:mt-0 flex-col space-y-5 justify-center lg:self-start">
        {scheduledEvents.map((scheduledEvent) => (
          <div
            className="flex flex-col 2xl:flex-row items-center justify-center space-x-4 border-b-2 border-white text-white "
            key={scheduledEvent.id}
          >
            <div className="flex flex-col">
              <div>{scheduledEvent.scheduledEvent}</div>
              <div>{scheduledEvent.date}</div>
              <div className="flex justify-between mt-1">
                <div>
                  <div className="font-bold">{scheduledEvent.time}</div>
                </div>
                <Trash2
                  className="flex text-white hover:cursor-pointer hover:text-slate-200 mr-5"
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

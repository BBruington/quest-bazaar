"use client";
import {
  MessageCircle,
  CalendarDays,
  User,
  Users,
  Scroll,
  Settings,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import Spinner from "~/components/spinner/spinner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function CampaignComponent() {
  return (
    <div className="flex h-screen w-screen flex-col lg:flex-row">
      <div className="mx-2 mb-2 basis-1/6">
        <Accordion
          type="single"
          collapsible
          className="ml-2 w-full text-center lg:text-left"
        >
          <AccordionItem value="item-1">
            <button
              className="flex w-full justify-center py-2 text-white hover:underline lg:justify-start"
              disabled
            >
              <span className="flex w-20 justify-start lg:ml-3">Chat</span>{" "}
              <MessageCircle className="ml-2" />
            </button>
          </AccordionItem>
          <AccordionItem value="item-2">
            <button
              className="flex w-full justify-center py-3 text-white hover:underline lg:justify-start"
              disabled
            >
              <span className="flex w-20 justify-start lg:ml-3">Calendar</span>{" "}
              <CalendarDays className="ml-2" />
            </button>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="flex justify-center lg:justify-start">
              <div className="flex">
                <span className="ml-3 flex w-20 justify-start">DM</span>{" "}
                <User className="ml-2" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center justify-center space-x-6 lg:justify-start">
                <Spinner />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="justify-center lg:justify-start">
              <div className="flex">
                <span className="ml-3 flex w-20 justify-start">Players</span>{" "}
                <Users className="ml-2" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Spinner />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="justify-center lg:justify-start">
              <div className="flex">
                <span className="ml-3 flex w-20 justify-start">Notes</span>{" "}
                <Scroll className="ml-2" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex justify-center space-x-5 lg:justify-around">
                <Button
                  className="h-8 w-32 py-3 text-xs text-white hover:underline"
                  disabled
                >
                  Public Notes
                </Button>
                <Button
                  className="h-8 w-32 py-3 text-xs text-white hover:underline"
                  disabled
                >
                  Personal Notes
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="justify-center lg:justify-start">
              <div className="flex">
                <span className="ml-3 flex w-20 justify-start">Campaign</span>{" "}
                <Settings className="ml-2" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <AlertDialog>
                  <div className="flex justify-center space-x-5">
                    <AlertDialogTrigger disabled>
                      <Button
                        variant="destructive"
                        disabled
                        className="h-8 w-32"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <Dialog>
                      <DialogTrigger className="m-0" disabled asChild>
                        <Button disabled className="h-8 w-32">
                          Create Post
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-h-[1000px] bg-black sm:max-w-[1200px]">
                        <Spinner />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your campaign and remove it from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="flex h-5/6 w-5/6 flex-col self-center rounded-md bg-accent-foreground p-2 lg:w-4/6 lg:self-start">
        <div className="mt-auto">
          <Input className=" mt-auto border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground" />
        </div>
      </div>
    </div>
  );
}

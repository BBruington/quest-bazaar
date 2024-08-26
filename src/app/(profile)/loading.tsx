import { Mail, User, Plus, PersonStandingIcon } from "lucide-react";
import { Toaster } from "react-hot-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import Spinner from "~/components/spinner/spinner";
import { Input } from "~/components/ui/input";

export default async function Messages() {
  return (
    <>
      <Toaster position="top-center" />
      <div className="flex h-screen flex-col bg-foreground sm:flex-row">
        <div className="mx-2 flex w-full flex-col sm:w-1/3 lg:w-1/6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="flex justify-center hover:text-slate-200 sm:justify-start">
                <div className="flex sm:w-2/3 sm:justify-between">
                  <span>Add Friend</span>{" "}
                  <Plus className="invisible sm:visible sm:ml-2" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Spinner />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="flex justify-center hover:text-slate-200 sm:justify-start">
                <div className="flex sm:w-2/3 sm:justify-between">
                  <span>Friends</span>{" "}
                  <User className="invisible sm:visible sm:ml-2" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col">
                  <Spinner />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="flex justify-center hover:text-slate-200 sm:justify-start">
                <div className="flex sm:w-2/3 sm:justify-between">
                  <span>Notifications</span>{" "}
                  <Mail className="invisible sm:visible sm:ml-2" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {/* UserNotifications */}
                  <Spinner />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="flex justify-center hover:text-slate-200 sm:justify-start">
                <div className="flex sm:w-2/3 sm:justify-between">
                  <span>Characters</span>{" "}
                  <PersonStandingIcon className="invisible sm:visible sm:ml-2" />
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <Spinner />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="invisible mt-20 flex h-0 w-full sm:visible sm:h-60 lg:invisible lg:h-0"></div>
        </div>

        <div className="flex h-full w-full flex-col overflow-y-auto rounded-md bg-accent-foreground p-2 sm:h-5/6 sm:w-4/6 lg:w-4/6">
          <div className="mt-auto">
            <Input
              className="mt-auto border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
              disabled={true}
            />
          </div>
        </div>
        <div className="invisible w-0 lg:visible lg:w-1/6"></div>
      </div>
    </>
  );
}

"use client"
import DisplayMessages from "./profile/displayMessages";
import SelectedFriend from "./profile/selectedFriend";
import { api } from "~/utils/trpc";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar"
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger, } from "./ui/accordion";
import type { Message, MyMessagesProps } from "~/app/types/Message";

export default function MyMessages({messages}: MyMessagesProps) {

  const [messageArr, setMessageArr] = useState(messages);

  const {user} = useUser();
  if ( !user ) return <div>loading...</div>
  const mutation  = api.addFriend.useMutation()

  const handleAddFriend = (friendName: string) => {
    const id = user.id
    mutation.mutate({ name: friendName, id });
  };

  return (
    <>
    <div className="flex bg-foreground h-screen">
      <div className="w-1/6 mx-2">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-2">
            <AccordionTrigger>Add Friend</AccordionTrigger>
            <AccordionContent>
              <div className="flex">
                <Input placeholder="Friend" className="mt-auto bg-primary placeholder:text-black border-none focus-visible:ring-accent-foreground ring-offset-black ring-2 text-black"></Input>
                <Button onClick={() => handleAddFriend("randyrando")} className="ml-2">Add</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger>Friends</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col">
                <button className="w-full py-1 hover:bg-slate-800">
                  <div className="flex space-x-3 items-center">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>Friend A</span>
                  </div>
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Notifications</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <DisplayMessages messages={messages} />

      <SelectedFriend />

    </div>
    </>
  )
}
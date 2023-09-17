"use client"
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
                <Button className="ml-2">Add</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger>Friends</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          {/* <AccordionItem value="item-3">
            <AccordionTrigger>Add Friend</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem> */}
        </Accordion>
      </div>
      <div className="flex flex-col bg-accent-foreground p-2 lg:w-4/6 w-4/6 h-5/6 rounded-md">
        <div className="mt-auto ">
          {messages.map((message) => (
              <div key={message.id} className="bg-accent-foreground p-2" >
                {message.senderId === user.id && (
                  <div className='flex text-right justify-end' key={message.id}>
                    <span className="bg-blue-500 text-black p-2 rounded-md">
                      {message.content}
                    </span>
                  </div>
                )}
                {message.senderId !== user.id && (
                  <div className='flex justify-left mb-5' key={message.id}>
                    <span className="bg-slate-700 text-white p-2 rounded-md">{message.content}</span>
                  </div>
                )}
              </div>
          ))}

        <Input placeholder="Message" className="mt-auto bg-primary placeholder:text-black border-none focus-visible:ring-accent-foreground ring-offset-black ring-2 text-black"></Input>
        </div>
      </div>
      <div className="w-1/6">
        <div className="flex items-center justify-center h-2/6 bg-accent-foreground mx-2">
          <div className="flex flex-col items-center justify-top bg-foreground w-5/6 h-4/6">
            <div className="text-white mt-5">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-white">also hi</div>
            <div className="flex justify-center mt-auto mb-5">
              <Button className="mr-5 w-1/3">Invite</Button>
              <Button variant="destructive" className="px-none w-1/3">Remove</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
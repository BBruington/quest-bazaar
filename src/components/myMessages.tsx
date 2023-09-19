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
import type { ChangeEvent } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger, } from "./ui/accordion";
import type { Message, MyMessagesProps } from "~/app/types/Message";

export default function MyMessages({messages}: MyMessagesProps) {

  const [messageArr, setMessageArr] = useState(messages);
  const [addFriendInput, setAddFriendInput] = useState("");

  
  const {user} = useUser();
  if ( !user ) return <div>loading...</div>
  const mutation  = api.addFriend.useMutation();

  const handleAddFriendChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setAddFriendInput(value);
    console.log(addFriendInput)
  };

  const handleAddFriend = (friendName: string) => {
    const id = user.id
    const friendRes = mutation.mutate({ name: friendName, id });
    setAddFriendInput("")
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
                <Input id="name"
                        name="name"
                        value={addFriendInput}
                        onChange={handleAddFriendChange}
                        placeholder="Friend" 
                        onKeyDown={(e) => {
                          if(e.key === "Enter") {
                            e.preventDefault();
                            if(addFriendInput !== "") {
                              handleAddFriend(addFriendInput);
                            }
                          }
                        }}
                        className="mt-auto bg-primary placeholder:text-black border-none focus-visible:ring-accent-foreground ring-offset-black ring-2 text-black"></Input>
                <Button onClick={() => handleAddFriend(addFriendInput)} className="ml-2">Add</Button>
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

      <div className="w-1/6">
        <div className="flex items-center justify-center h-60 bg-accent-foreground mx-2">
          <div className="flex flex-col items-center justify-top bg-foreground w-5/6 h-4/6">
            <div className="text-white mt-5">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-white mt-1">Friend A</div>
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
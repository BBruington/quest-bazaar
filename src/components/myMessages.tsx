"use client"
import DisplayMessages from "./profile/displayMessages";
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
import type { MyMessagesProps } from "~/app/types/Message";

export default function MyMessages({messages}: MyMessagesProps) {

  const [messageArr, setMessageArr] = useState(messages);
  const [selectedFriend, setSelectedFriend] = useState({});
  console.log(selectedFriend)
  const [addFriendInput, setAddFriendInput] = useState("");

  
  const {user} = useUser();
  if ( !user ) return <div>loading...</div>

  const addFriendMutation  = api.addFriend.useMutation();
  const handleFrRequestMutation = api.handleFriendRequest.useMutation();

  const {data: friendRequests, isLoading: loadingFriendRequests} = api.queryMyFriendRequests.useQuery({id: user.id});
  
  const handleAddFriendChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setAddFriendInput(value);
  };

  const handleFriendRequest = (senderId: string, frResponse: string) => {
    const fr = handleFrRequestMutation.mutate({
      senderId, receiverId: user.id, response: frResponse
    })
    return fr;
  }

  const handleAddFriend = (friendName: string) => {
    const id = user.id
    const friendRes = addFriendMutation.mutate({ receiverName: friendName, id, senderName: user.username! });
    setAddFriendInput("")
    return friendRes;
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
                  name="name" value={addFriendInput} onChange={handleAddFriendChange} placeholder="Friend" 
                  onKeyDown={(e) => {
                    if(e.key === "Enter") {
                      e.preventDefault();
                      if(addFriendInput !== "") {
                        handleAddFriend(addFriendInput);
                      }
                    }
                  }}
                  className="mt-auto bg-primary placeholder:text-black border-none focus-visible:ring-accent-foreground ring-offset-black ring-2 text-black">
                </Input>
                <Button onClick={() => handleAddFriend(addFriendInput)} className="ml-2">Add</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger>Friends</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col">
                {friendRequests?.map((friendRequest) => (
                <>
                  <button className="w-full py-1 hover:bg-slate-800" onClick={() => setSelectedFriend(friendRequest)}>
                    <div className="flex space-x-3 items-center">
                      {friendRequest.status === "ACCEPTED" ? (
                        <> 
                          <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <span>{friendRequest.senderName}</span>
                        </>
                      ) : null}
                    </div>
                  </button>
                </>))}                
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Notifications</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {friendRequests?.map((friendRequest) => (
                  <>
                    {friendRequest.status === "PENDING" ? (
                      <div className="flex md:flex-col border-b border-white pb-3">
                        <span className="flex justify-center text-sm">
                          {friendRequest.senderName} would like to be Friends
                        </span>
                        <div className="flex md:flex-row flex-col justify-around mt-1">
                          <Button className="h-6" onClick={() => handleFriendRequest(friendRequest.senderId, "ACCEPTED")}>Accept</Button>
                          <Button className="h-6" onClick={() => handleFriendRequest(friendRequest.senderId, "DECLINED")}>Decline</Button>
                        </div>
                      </div>

                    ) : null}
                  </>
                ))}                
              </div>
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
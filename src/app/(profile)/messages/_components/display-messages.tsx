"use client";

import { Input } from "~/components/ui/input";
import { useState } from "react";
import { useAtom } from "jotai";
import { selectedFriendAtom, friendMessagesAtom } from "../jotaiAtoms";
import { sendMessage } from "../actions";
import { User } from "@prisma/client";
import uuid from "react-uuid";

export default function DisplayMessages(props: { userId: User["clerkId"] }) {
  const { userId } = props;
  const [selectedFriend, setSelectedFriend] = useAtom(selectedFriendAtom);
  const [friendMessages, setFriendMessages] = useAtom(friendMessagesAtom);
  const [isLoading, setIsloading] = useState(false)
  const [inputValue, setInputValue] = useState("");

  const findFriendId = (userId: User["clerkId"]) => {
    if (userId === selectedFriend.senderId) return selectedFriend.receiverId;
    return selectedFriend.senderId;
  };

  const friendId = findFriendId(userId);

  const handleInputChange = (e: string) => {
    setInputValue(e);
  };

  const handleSendMessage = async () => {
    setIsloading(true)
    if (inputValue !== "") {
      await sendMessage({
        userId,
        friendId,
        content: inputValue,
      });
      if(friendMessages[0]?.id !== "" && friendMessages[0]?.id !== undefined) {
        setFriendMessages([...friendMessages, {
          id: uuid(),
          senderId: userId,
          recipientId: friendId,
          content: inputValue,
          sentAt: new Date(Date.now().toString())
        }])
      } else {
        setFriendMessages([{
          id: uuid(),
          senderId: userId,
          recipientId: friendId,
          content: inputValue,
          sentAt: new Date(Date.now().toString())
        }])
      }
    }
    setInputValue("")
    setIsloading(false)
  };

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto rounded-md bg-accent-foreground p-2 sm:h-5/6 sm:w-4/6 lg:w-4/6">
      <div className="mt-auto">
        {friendMessages[0]?.id !== "" && friendMessages[0]?.id !== undefined && friendMessages?.map((message) => (
          <div key={message.id} className="bg-accent-foreground p-2">
            {message.senderId === userId && (
              <div className="flex justify-end text-right" key={message.id}>
                <span className="rounded-md bg-blue-500 p-2 text-black">
                  {message.content}
                </span>
              </div>
            )}
            {message.senderId !== userId && (
              <div className="justify-left mb-5 flex" key={message.id}>
                <span className="rounded-md bg-slate-700 p-2 text-white">
                  {message.content}
                </span>
              </div>
            )}
          </div>
        ))}
        <Input
          placeholder={
            selectedFriend?.senderName ? "Message" : "Select a Friend"
          }
          className="mt-auto border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
          value={inputValue}
          disabled={selectedFriend.id === "" || isLoading}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
      </div>
    </div>
  );
}

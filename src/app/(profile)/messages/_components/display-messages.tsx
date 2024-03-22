"use client";

import type { SelectedFriendType } from "~/app/types/Message";
import { Input } from "~/components/ui/input";
import { api } from "~/utils/trpc";
import { useState } from "react";
import { useAtom } from "jotai";
import { selectedFriendAtom } from "../jotaiAtoms";
import { User } from "@prisma/client";

export default function DisplayMessages(props: { userId: User["clerkId"] }) {
  const [selectedFriend, setSelectedFriend] = useAtom(selectedFriendAtom);
  const [inputValue, setInputValue] = useState("");
  const { userId } = props;

  const utils = api.useContext();

  const { mutate, isLoading: sendingMessage } = api.sendMessage.useMutation({
    onSuccess: async () => {
      setInputValue("");
      await utils.queryFriendMessages.invalidate();
    },
    onError: (e) => {
      console.error(e);
    },
  });
  const findFriendId = (myId: User["clerkId"]) => {
    if (myId === selectedFriend.senderId) return selectedFriend.receiverId;
    return selectedFriend.senderId;
  };

  const friendId = findFriendId(userId);

  const { data: friendMessages } = api.queryFriendMessages.useQuery({
    userId,
    friendSenderId: friendId,
  });

  const handleInputChange = (e: string) => {
    setInputValue(e);
  };

  const handleSendMessage = () => {
    if (inputValue !== "") {
      mutate({
        userId: userId,
        friendId: friendId,
        content: inputValue,
      });
    }
  };

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto rounded-md bg-accent-foreground p-2 sm:h-5/6 sm:w-4/6 lg:w-4/6">
      <div className="mt-auto">
        {friendMessages?.map((message) => (
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
          disabled={sendingMessage || selectedFriend === undefined}
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

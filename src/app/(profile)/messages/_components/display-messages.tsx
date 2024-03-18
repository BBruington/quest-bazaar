"use-client";
import type { SelectedFriendType } from "~/app/types/Message";
import { Input } from "~/components/ui/input";
import { api } from "~/utils/trpc";
import { useState } from "react";

export default function DisplayMessages(props: {
  selectedFriend: SelectedFriendType;
  userId: string;
}) {
  const [inputValue, setInputValue] = useState("");
  const { selectedFriend, userId } = props;

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
  const findFriendId = (myId: string) => {
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
    <div className="flex h-full sm:h-5/6 w-full sm:w-4/6 flex-col rounded-md bg-accent-foreground overflow-y-auto p-2 lg:w-4/6">
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

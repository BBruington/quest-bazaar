"use-client"; 
import type { SelectedFriend } from "~/app/types/Message";
import { Input } from "../ui/input";
import { api } from "~/utils/trpc";
import { useState } from "react";

export default function DisplayMessages(props: {
  selectedFriend: SelectedFriend,
  userId: string,
}) {
  const [inputValue, setInputValue] = useState("");
  const { selectedFriend, userId } = props;

  const utils = api.useContext();

  const { mutate, isLoading: sendingMessage } = api.sendMessage.useMutation({
    onSuccess: async() => {
      setInputValue("");
      await utils.queryFriendMessages.invalidate()
    },
    onError: (e) => {
      console.error(e);
    },
  });

  const handleInputChange = (e: string) => {
    setInputValue(e);
  };
  
  const findFriendId = (myId: string) => {
    if (myId === selectedFriend.senderId) return selectedFriend.receiverId;
    return selectedFriend.senderId;
  };
  const friendId = findFriendId(userId);

  const { data: friendMessages, isLoading: loadingFriendMessages } =
    api.queryFriendMessages.useQuery({
      userId,
      friendSenderId: friendId,
    });
  if (!friendMessages) return <div>failed to load friend messages</div>;


  return (
    <>
      {loadingFriendMessages ? (
        <div className="flex h-5/6 w-4/6 flex-col rounded-md bg-accent-foreground p-2 lg:w-4/6">
          <div className="mt-auto ">
            <div className="bg-accent-foreground p-2">
              <div className="flex justify-end text-right">
                <span className="rounded-md bg-blue-500 p-2 text-black">
                  Loading...
                </span>
              </div>
              <div className="justify-left mb-5 flex">
                <span className="rounded-md bg-slate-700 p-2 text-white">
                  Loading...
                </span>
              </div>
            </div>

            <Input
              disabled
              placeholder="Message"
              className="mt-auto border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
            ></Input>
          </div>
        </div>
      ) : (
        <div className="flex h-5/6 w-4/6 flex-col rounded-md bg-accent-foreground p-2 lg:w-4/6">
          <div className="mt-auto ">
            {friendMessages.map((message) => (
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
              placeholder="Message"
              className="mt-auto border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
              value={inputValue}
              disabled={sendingMessage}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (inputValue !== "") {
                    mutate({
                      userId: userId,
                      friendId: friendId,
                      content: inputValue,
                    });
                  }
                }
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

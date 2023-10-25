'use-client'
import type { SelectedFriend } from "~/app/types/Message";
import { Input } from "../ui/input";
import { api } from "~/utils/trpc";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function DisplayMessages(props: { selectedFriend: SelectedFriend}) {
  const {selectedFriend} = props
  const [inputValue, setInputValue] = useState('');
  const {user} = useUser();
  if (!user) return<div>loading...</div>
  const {data: friendMessages, isLoading: loadingFriendMessages} = api.queryFriendMessages.useQuery({userId: user.id, friendSenderId: selectedFriend.senderId});
  if ( !friendMessages ) return <div>failed to load friend messages</div>

  const handleInputChange = (e: string) => {
    setInputValue(e);
  }

  return (
    <>
    {loadingFriendMessages ? (
      <div className="flex flex-col bg-accent-foreground p-2 lg:w-4/6 w-4/6 h-5/6 rounded-md">
        <div className="mt-auto ">
          <div  className="bg-accent-foreground p-2" >
            <div className='flex text-right justify-end'>
              <span className="bg-blue-500 text-black p-2 rounded-md">
                Loading...
              </span>
            </div>
            <div className='flex justify-left mb-5'>
              <span className="bg-slate-700 text-white p-2 rounded-md">Loading...</span>
            </div>
          </div>

          <Input 
            disabled
            placeholder="Message" 
            className="mt-auto bg-primary placeholder:text-black border-none focus-visible:ring-accent-foreground ring-offset-black ring-2 text-black"></Input>
        </div>
      </div>
    ) : (
      <div className="flex flex-col bg-accent-foreground p-2 lg:w-4/6 w-4/6 h-5/6 rounded-md">
        <div className="mt-auto ">
          {friendMessages.map((message) => (
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

        <Input 
          placeholder="Message" 
          className="mt-auto bg-primary placeholder:text-black border-none focus-visible:ring-accent-foreground ring-offset-black ring-2 text-black"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === "Enter") {
              e.preventDefault();
              if(inputValue !== "") {
                mutate({ content: input });
              }
            }
          }}
          >
        </Input>
        </div>
      </div>
    )}
    </>
  )
}
'use-client'
import type { SelectedFriend, Message } from "~/app/types/Message";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { useUser } from "@clerk/nextjs";

export default function DisplayMessages(props: {messages: Message[], selectedFriend: SelectedFriend}) {
  const {messages, selectedFriend} = props
  const {user} = useUser()
  useEffect(() => {
    const filteredMessages = messages.filter((message) => {
      return (
        message.senderId === selectedFriend.senderId ||
        message.recipientId === selectedFriend.senderId
      );
    });
    setMessageState(filteredMessages)
  }, [selectedFriend]) 
  
  const [messageState, setMessageState] = useState([{
    id: '',
    content: '',
    senderId: '',
    recipientId: '',
  }])
  if ( !user ) return <div>loading...</div>

  return (
    <>
    <div className="flex flex-col bg-accent-foreground p-2 lg:w-4/6 w-4/6 h-5/6 rounded-md">
      <div className="mt-auto ">
        {messageState.map((message) => (
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
        className="mt-auto bg-primary placeholder:text-black border-none focus-visible:ring-accent-foreground ring-offset-black ring-2 text-black"></Input>
      </div>
    </div>
    </>
  )
}
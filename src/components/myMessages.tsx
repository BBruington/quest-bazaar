"use client"
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import type { Message, MyMessagesProps } from "~/app/types/Message";

export default function MyMessages({messages}: MyMessagesProps) {

  const [messageArr, setMessageArr] = useState(messages);
  const {user} = useUser();
  if ( !user ) return <div>loading...</div>

  return (
    <>
    <div>
      {messages.map((message) => (
        <>
        {message.senderId === user.id && (
          <div className='flex text-right justify-end' key={message.id}>
            {message.content}
          </div>
        )}
        {message.senderId !== user.id && (
          <div className='flex justify-left' key={message.id}>
            <span>{message.content}</span>
          </div>
        )}
        </>
      ))}
    </div>
    </>
  )
}
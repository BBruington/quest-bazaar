"use client"
import { useUser } from "@clerk/nextjs"

// Define the interface for the messages prop
interface Message {
  id: string;
  content: string;
  senderId: string;
  recipientId: string;
  sentAt: string; // You should use the actual data type for sentAt
}

interface MyMessagesProps {
  messages: Message[];
}


export default function MyMessages({messages}: MyMessagesProps) {
  const {user} = useUser()
  return (
    <>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            {message.content}
          </div>
        ))}
      </div>
    </>
  )
}
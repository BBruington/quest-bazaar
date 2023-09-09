export interface Message {
  id: string;
  content: string;
  senderId: string;
  recipientId: string;
  sentAt: Date; 
}

export interface MyMessagesProps {
  messages: Message[];
}
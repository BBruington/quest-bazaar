export interface Message {
  id: string;
  content: string;
  senderId: string;
  recipientId: string;
  sentAt: Date; 
}
export interface SelectedFriend {
    id: string;
    status: string;
    receiverName: string;
    senderName: string;
    senderId: string;
    receiverId: string;
    createdAt: string;
    updatedAt: string;
}

export interface MyMessagesProps {
  messages: Message[];
}
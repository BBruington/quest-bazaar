export interface SelectedFriendType {
  id: string;
  status: string;
  receiverName: string;
  senderName: string;
  senderId: string;
  receiverId: string;
  senderImgUrl: string | null;
  receiverImgUrl: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

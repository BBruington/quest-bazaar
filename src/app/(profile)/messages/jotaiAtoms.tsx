import { atom } from "jotai";
import { SelectedFriendType } from "~/app/types/Message";
import { Message } from "@prisma/client";
const selectedFriendAtom = atom<SelectedFriendType>({
  id: "",
  status: "",
  receiverName: "",
  receiverId: "",
  receiverImgUrl: null,
  senderName: "",
  senderId: "",
  senderImgUrl: null,
  createdAt: "",
  updatedAt: "",
});

const date = new Date(Date.now().toString())

const friendMessagesAtom = atom<Message[] | undefined>([{
    id: "",
    content: "",
    senderId: "",
    recipientId: "",
    sentAt: date
}])

export { selectedFriendAtom, friendMessagesAtom };

import { atom } from "jotai";
import { SelectedFriendType } from "~/app/types/Message";
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

export { selectedFriendAtom };

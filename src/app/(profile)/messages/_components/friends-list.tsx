"use client";

import { Friendship, User } from "@prisma/client";
import { useAtom } from "jotai";
import { SelectedFriendType } from "~/app/types/Message";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { selectedFriendAtom, friendMessagesAtom } from "../jotaiAtoms";
import { queryFriendChat } from "../actions";
import { useState } from "react";

interface FriendsListProps {
  friend: Friendship;
  userId: string;
}

export default function FriendsList({ friend, userId }: FriendsListProps) {
  const [selectedFriend, setSelectedFriend] = useAtom(selectedFriendAtom);
  const [friendMessages, setFriendMessages] = useAtom(friendMessagesAtom);

  const getMessages = async (friend: SelectedFriendType) => {
    const friendChat = await queryFriendChat({
      userId,
      friendSenderId:
        friend.receiverId !== userId ? friend.receiverId : friend.senderId,
    });
    setFriendMessages(friendChat);
  };

  const handleSelectedFriend = async (friend: SelectedFriendType) => {
    setSelectedFriend(friend);
    await getMessages(friend);
  };

  return (
    <div
      key={friend.id}
      role="button"
      className="w-full py-1 hover:bg-slate-800"
      onClick={() => handleSelectedFriend(friend)}
    >
      <div className="flex items-center space-x-3">
        {friend.receiverId === userId ? (
          <>
            <Avatar>
              <AvatarImage
                src={
                  friend.receiverId === userId
                    ? friend.senderImgUrl!
                    : friend.receiverImgUrl!
                }
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>{friend.senderName}</span>
          </>
        ) : (
          <>
            <Avatar>
              <AvatarImage
                src={
                  friend.receiverId === userId
                    ? friend.senderImgUrl!
                    : friend.receiverImgUrl!
                }
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>{friend.receiverName}</span>
          </>
        )}
      </div>
    </div>
  );
}

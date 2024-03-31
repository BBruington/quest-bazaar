"use client";
import React from "react";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { Friendship } from "@prisma/client";
import { handleFriendRequest } from "../actions";
interface UserNotificationProps {
  notification: Friendship;
  userId: string;
}
export default function FriendRequest({
  userId,
  notification,
}: UserNotificationProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFriendRequestResponse = async (requestResponse: "ACCEPTED" | "DECLINED") => {
    setIsLoading(true);
    await handleFriendRequest({
      senderId: notification.senderId,
      receiverId: userId,
      response: requestResponse,
    });
    setIsLoading(false);
  };

  return (
    <>
      <Button
        className="h-6"
        disabled={isLoading}
        onClick={() => handleFriendRequestResponse("ACCEPTED")}
      >
        Accept
      </Button>
      <Button
        className="h-6"
        disabled={isLoading}
        onClick={() => handleFriendRequestResponse("DECLINED")}
      >
        Decline
      </Button>
    </>
  );
}

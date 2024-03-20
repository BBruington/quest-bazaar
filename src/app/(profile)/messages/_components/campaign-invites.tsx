"use client";
import React from "react";
import { Button } from "~/components/ui/button";
import { Campaign, Friendship } from "@prisma/client";
import { api } from "~/utils/trpc";
import campaign from "~/components/campaign/campaign";
import friendRequests from "./friend-requests";
interface UserNotificationProps {
  notification: Campaign;
  userId: string;
}
export default function CampaignInvite({
  userId,
  notification,
}: UserNotificationProps) {
  const handleReceivedFriendRequest = api.handleFriendRequest.useMutation({});

  const handleReceivedCampaignInvite = api.handleCampaignInvite.useMutation({});

  const { data: friends } = api.queryMyFriends.useQuery({ id: userId });

  const { data: receivedInvitedCampaigns } =
    api.queryUserInvitedCampaigns.useQuery({ userId: userId });

  // const pendingFriendRequests = friendRequests?.filter(function (request) {
  //   return request.status === "PENDING";
  // });

  const handleCampaignInviteResponse = (
    campaignId: string,
    campaignRes: string
  ) => {
    handleReceivedCampaignInvite.mutate({
      campaignId,
      userId,
      campaignRes,
    });
  };

  const handleFriendRequestResponse = (
    senderId: string,
    requestResponse: string
  ) => {
    handleReceivedFriendRequest.mutate({
      senderId,
      receiverId: userId,
      response: requestResponse,
    });
  };

  // let notificationsAmount = 0;
  // if (receivedInvitedCampaigns && pendingFriendRequests)
  //   notificationsAmount =
  //     receivedInvitedCampaigns.length + pendingFriendRequests.length;
  return (
    <>
      <Button
        className="h-6"
        disabled={handleReceivedCampaignInvite.isLoading}
        onClick={() =>
          handleCampaignInviteResponse(notification.id, "ACCEPTED")
        }
      >
        Accept
      </Button>
      <Button
        className="h-6"
        disabled={handleReceivedCampaignInvite.isLoading}
        onClick={() =>
          handleCampaignInviteResponse(notification.id, "DECLINED")
        }
      >
        Decline
      </Button>
    </>
  );
}
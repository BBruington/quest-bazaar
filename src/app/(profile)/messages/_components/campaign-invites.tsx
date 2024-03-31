"use client";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Campaign } from "@prisma/client";
import { handleCampaignInvite } from "../actions";
interface UserNotificationProps {
  notification: Campaign;
  userId: string;
}
export default function CampaignInvite({
  userId,
  notification,
}: UserNotificationProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCampaignInviteResponse = async (response: "ACCEPTED" | "DECLINED") => {
    setIsLoading(true);
    await handleCampaignInvite({
      campaignId: notification.id,
      userId,
      response,
    });
    setIsLoading(false);
  };

  return (
    <>
      <Button
        className="h-6"
        disabled={isLoading}
        onClick={() => handleCampaignInviteResponse("ACCEPTED")}
      >
        Accept
      </Button>
      <Button
        className="h-6"
        disabled={isLoading}
        onClick={() => handleCampaignInviteResponse("DECLINED")}
      >
        Decline
      </Button>
    </>
  );
}

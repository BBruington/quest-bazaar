"use server"

import { Campaign, CampaignChat, User } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { prisma } from "~/utils/context";

interface SendChatMessage {
  campaignId: Campaign["id"]
  username: User["username"]
  chatMessage: CampaignChat["chat"]
}

export const sendChatMessage = async ({campaignId, username, chatMessage}: SendChatMessage) => {
  const sentMessage = await prisma.campaignChat.create({
    data: {
      campaignId: campaignId,
      username: username? username : "",
      chat: chatMessage,
    },
  });
  revalidatePath(`myCampaigns/${campaignId}`)
  return sentMessage;
}
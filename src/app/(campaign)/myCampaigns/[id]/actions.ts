"use server";

import { Campaign, CampaignChat, CampaignNote, User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { prisma } from "~/utils/context";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(8, "1 m"),
});

interface SendChatMessage {
  campaignId: Campaign["id"];
  username: User["username"];
  chatMessage: CampaignChat["chat"];
}

export const sendChatMessage = async ({
  campaignId,
  username,
  chatMessage,
}: SendChatMessage) => {
  const sentMessage = await prisma.campaignChat.create({
    data: {
      campaignId: campaignId,
      username: username ? username : "",
      chat: chatMessage,
    },
  });
  revalidatePath(`myCampaigns/${campaignId}`);
  return sentMessage;
};

interface UpsertCampaignNoteProps {
  noteId: CampaignNote["id"] | undefined;
  userId: User["clerkId"];
  privateNote: CampaignNote["private"];
  campaignId: Campaign["id"];
  title: CampaignNote["title"];
  content: CampaignNote["content"];
}

export const upsertCampaignNote = async ({
  noteId,
  userId,
  privateNote,
  campaignId,
  title,
  content,
}: UpsertCampaignNoteProps) => {
  const { success } = await ratelimit.limit(userId);

  if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

  const upsertCampaign = await prisma.campaignNote.upsert({
    where: {
      id: noteId,
    },
    update: {
      title: title,
      content: content,
    },
    create: {
      userId: userId,
      private: privateNote,
      campaignId: campaignId,
      title: title,
      content: content,
    },
  });
  revalidatePath(`myCampaigns/${campaignId}`);
  return upsertCampaign;
};

interface DeleteCampaignNoteProps {
  noteId: CampaignNote["id"];
  campaignId: Campaign["id"];
}

export const deleteCampaignNote = async ({
  noteId,
  campaignId,
}: DeleteCampaignNoteProps) => {
  if (noteId) {
    try {
      await prisma.campaignNote.delete({
        where: { id: noteId },
      });
      revalidatePath(`myCampaigns/${campaignId}`);
    } catch (e) {
      console.error(e);
    }
  }
};

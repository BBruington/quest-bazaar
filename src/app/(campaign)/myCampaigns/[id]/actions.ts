"use server";

import {
  Campaign,
  CampaignChat,
  CampaignNote,
  CampaignSchedules,
  User,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { prisma } from "~/utils/context";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(8, "1 m"),
});

interface Response {
  status: "SUCCESS" | "ERROR" | "FAILED";
  message: string;
}

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

  const upsertCampaignNote = await prisma.campaignNote.upsert({
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
  return upsertCampaignNote;
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

interface DeleteCampaignProps {
  campaignId: Campaign["id"];
}

export const deleteCampaign = async ({
  campaignId,
}: DeleteCampaignProps): Promise<Response | undefined> => {
  await prisma.campaignNote.deleteMany({
    where: {
      campaignId: campaignId,
    },
  });

  await prisma.campaign.delete({
    where: {
      id: campaignId,
    },
  });
  revalidatePath(`myCampaigns`);
  return { status: "SUCCESS", message: "You have deleted the campaign." };
};

interface HandleRequestToJoinGameProps {
  campaignId: Campaign["id"];
  userId: User["clerkId"];
  response: "ACCEPTED" | "DECLINED";
}

export const handleRequestToJoinGame = async ({
  campaignId,
  userId,
  response,
}: HandleRequestToJoinGameProps): Promise<Response | undefined> => {
  const { success } = await ratelimit.limit(userId);

  if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

  if (response === "ACCEPTED") {
    try {
      await prisma.campaign.update({
        where: {
          id: campaignId,
        },
        data: {
          players: {
            connect: {
              clerkId: userId,
            },
          },
          requestingInvitePlayers: {
            disconnect: {
              clerkId: userId,
            },
          },
        },
      });
      revalidatePath(`myCampaigns/${campaignId}`);
      return {
        status: "SUCCESS",
        message: "Request to join game was accepted.",
      };
    } catch (error) {
      console.error("Error updating campaign: ", error);
      return {
        status: "ERROR",
        message: `Something went wrong. Error: ${error}`,
      };
    }
  } else {
    try {
      await prisma.campaign.update({
        where: {
          id: campaignId,
        },
        data: {
          requestingInvitePlayers: {
            disconnect: {
              clerkId: userId,
            },
          },
        },
      });
      revalidatePath(`myCampaigns/${campaignId}`);
      return {
        status: "SUCCESS",
        message: "Request to join game was declined.",
      };
    } catch (error) {
      console.error("Error updating campaign: ", error);
      return {
        status: "ERROR",
        message: `Something went wrong. Error: ${error}`,
      };
    }
  }
};
interface CreateCampaignScheduledEventProps {
  time: CampaignSchedules["time"];
  date: CampaignSchedules["date"];
  scheduledEvent: CampaignSchedules["scheduledEvent"];
  campaignId: Campaign["id"];
}

export const createCampaginScheduledEvent = async ({
  time,
  date,
  scheduledEvent,
  campaignId,
}: CreateCampaignScheduledEventProps): Promise<Response | undefined> => {
  const { success } = await ratelimit.limit(campaignId);

  if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

  await prisma.campaignSchedules.create({
    data: {
      campaignId: campaignId,
      time: time,
      date: date,
      scheduledEvent: scheduledEvent,
    },
  });

  revalidatePath(`myCampaigns/${campaignId}`);
  return {
    status: "SUCCESS",
    message: "Scheduled event created.",
  };
};
interface DeleteCampaignScheduledEventProps {
  scheduledEventId: CampaignSchedules["id"];
  campaignId: Campaign["id"];
}

export const deleteCampaignScheduledEvent = async ({
  scheduledEventId,
  campaignId,
}: DeleteCampaignScheduledEventProps): Promise<Response | undefined> => {
  await prisma.campaignSchedules.delete({
    where: {
      id: scheduledEventId,
    },
  });
  revalidatePath(`myCampaigns/${campaignId}`);
  return {
    status: "SUCCESS",
    message: "The scheduled event for the campaign calendar was deleted.",
  };
};

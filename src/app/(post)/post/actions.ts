"use server";
import { prisma } from "~/utils/context";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { TRPCError } from "@trpc/server";
import { Campaign, Post, User } from "@prisma/client";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(8, "1 m"),
});

interface Response {
  status: string
  message: string
}

interface RequestInviteToCampaignProps {
  userId: User["clerkId"];
  campaignId: Campaign["id"];
}

export const requestInviteToCampaign = async ({
  userId,
  campaignId,
}: RequestInviteToCampaignProps): Promise<Response | undefined> => {
  const { success } = await ratelimit.limit(userId);

  if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      include: { requestingInvitePlayers: true, players: true }, // Include invitedPlayers relation
    });
    if (!campaign) {
      return {
        status: "ERROR",
        message: "Somethign went wrong. Failed to find campaign.",
      };
    }
    if (campaign.players.find((player) => player.clerkId === userId)) {
      return {
        status: "FAILED",
        message: "You are already a member of the campaign",
      };
    }
    await prisma.campaign.update({
      where: {
        id: campaignId,
      },
      data: {
        requestingInvitePlayers: {
          connect: {
            clerkId: userId,
          },
        },
      },
    });
    return {
      status: "SUCCESS",
      message: "Request to campaign was sent successfully",
    };
  } catch (error) {
    console.error("error: ", error);
    return {
      status: "ERROR",
      message: "Something went wrong while trying to send request to the campaign.",
    };
  }
};

interface CreateCampaignPostProps {
  userId: User["clerkId"];
  campaignId: Campaign["id"];
  players: Post["players"];
  startingLevel: Post["startingLevel"];
  finishingLevel: Post["finishingLevel"];
  title: Post["title"];
  description: Post["description"];
  author: Post["author"];
  mainImage: Post["mainImage"];
  body: Post["body"];
}

export const createCampaignPost = async ({
  userId,
  campaignId,
  players,
  startingLevel,
  finishingLevel,
  title,
  description,
  author,
  mainImage,
  body,
}: CreateCampaignPostProps): Promise<Response | undefined> => {
  try {
    await prisma.post.create({
      data: {
        campaignId: campaignId,
        userId: userId,
        players: players,
        startingLevel: startingLevel,
        finishingLevel: finishingLevel,
        title: title,
        description: description,
        author: author,
        mainImage: mainImage,
        body: body,
      },
    });
    return {status: "SUCCESS", message: "Post was created"};
  } catch (e) {
    console.error(e);
    return {status: "ERROR", message: "Something went wrong while trying to create the post."};
  }
};

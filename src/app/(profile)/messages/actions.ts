"use server";

import { prisma } from "~/utils/context";
import { revalidatePath } from "next/cache";
import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(8, "1 m"),
});

export const sendMessage = async ({ userId, friendId, content }) => {
  try {
    const message = await prisma.message.create({
      data: {
        senderId: userId,
        recipientId: friendId,
        content: content,
      },
    });
    revalidatePath("messages");
    return message;
  } catch {
    throw new TRPCError({
      code: "BAD_REQUEST",
    });
  }
};

export const queryFriendChat = async ({ userId, friendSenderId }) => {
  try {
    const messagesData = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
          },
          {
            recipientId: userId,
          },
        ],
      },
      orderBy: {
        sentAt: "asc",
      },
    });
    const filteredMessages = messagesData.filter((message) => {
      return (
        message.senderId === friendSenderId ||
        message.recipientId === friendSenderId
      );
    });

    revalidatePath("messages");
    return filteredMessages;
  } catch {
    throw new TRPCError({
      code: "NOT_FOUND",
    });
  }
};

export const handleFriendRequest = async ({
  response,
  senderId,
  receiverId,
}) => {
  if (response === "ACCEPTED") {
    const acceptedFriend = await prisma.friendship.updateMany({
      where: {
        senderId: senderId,
        receiverId: receiverId,
      },
      data: {
        status: "ACCEPTED",
      },
    });
    revalidatePath("/messages");
    return acceptedFriend;
  } else {
    const declinedFriend = await prisma.friendship.deleteMany({
      where: {
        senderId: senderId,
        receiverId: receiverId,
      },
    });
    revalidatePath("/messages");
    return declinedFriend;
  }
};

export const sendFriendRequest = async ({
  receiverName,
  senderName,
  userId,
}) => {
  try {
    const friendRequest = await prisma.friendship.findFirst({
      where: {
        OR: [
          {
            receiverName: receiverName,
            senderId: userId,
            senderName: senderName,
          },
          {
            receiverName: senderName,
            senderName: receiverName,
            receiverId: userId,
          },
        ],
      },
    });
    if (friendRequest?.status === "PENDING") {
      return {
        status: "FAILED",
        message: "Already have sent a friend request",
      };
    }
    if (friendRequest?.status === "ACCEPTED") {
      return { status: "FAILED", message: "You are already friends" };
    }
    const recipient = await prisma.user.findUnique({
      where: {
        username: receiverName,
      },
      select: {
        clerkId: true,
        imgUrl: true,
      },
    });
    if (recipient === null) {
      console.log("Could not find friend");
      return { status: "ERROR", message: "Could not find friend" };
    }
    const sender = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        clerkId: true,
        imgUrl: true,
      },
    });
    if (sender === null) {
      console.log("failed to find friend");
      return { status: "ERROR", message: "Failed to find friend" };
    }

    await prisma.friendship.create({
      data: {
        receiverId: recipient.clerkId,
        receiverName: receiverName,
        receiverImgUrl: recipient.imgUrl,
        senderId: userId,
        senderName: senderName,
        senderImgUrl: sender.imgUrl,
      },
    });

    revalidatePath("/messages");
    return { status: "ACCEPTED", message: "Friend request was sent!" };
  } catch (error) {
    console.error("error: ", error);
    return {
      status: "ERROR",
      message: "Something went wrong. Please try again.",
    };
  }
};

export const handleCampaignInvite = async ({
  campaignId,
  userId,
  response,
}) => {
  if (response === "ACCEPTED") {
    try {
      const updatedCampaign = await prisma.campaign.update({
        where: {
          id: campaignId,
        },
        data: {
          players: {
            connect: {
              clerkId: userId,
            },
          },
          invitedPlayers: {
            disconnect: {
              clerkId: userId,
            },
          },
        },
      });
      revalidatePath("/messages");
      return updatedCampaign;
    } catch (error) {
      console.error("Error updating campaign: ", error);
      throw error;
    }
  } else {
    try {
      const updatedCampaign = await prisma.campaign.update({
        where: {
          id: campaignId,
        },
        data: {
          invitedPlayers: {
            disconnect: {
              clerkId: userId,
            },
          },
        },
      });
      revalidatePath("/messages");
      return updatedCampaign;
    } catch (error) {
      console.error("Error updating campaign: ", error);
      throw error;
    }
  }
};

export const inviteToCampaign = async ({ playerId, campaignId }) => {
  const { success } = await ratelimit.limit(playerId);

  if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      include: { invitedPlayers: true, players: true }, // Include invitedPlayers relation
    });
    if (!campaign) {
      throw new Error("Campaign not found");
    }
    if (campaign.players.find((player) => player.clerkId === playerId)) {
      return { status: "FAILED", message: "They are already a member" };
    }
    if (campaign.invitedPlayers.find((player) => player.clerkId === playerId)) {
      return { status: "FAILED", message: "They have already been invited" };
    }
    await prisma.campaign.update({
      where: {
        id: campaignId,
      },
      data: {
        invitedPlayers: {
          connect: {
            clerkId: playerId,
          },
        },
      },
    });
    revalidatePath("/messages");
    return { status: "SUCCESS", message: "Your invite was sent" };
  } catch (error) {
    console.error("error: ", error);
  }
};

export const createNewCharacterSheet = async ({ userId }) => {
  const newCharacter = prisma.character.create({
    data: {
      userId,
      charname: "New Character",
    },
  });
  revalidatePath("/messages");
  return newCharacter;
};

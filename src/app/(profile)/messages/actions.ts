"use server";

import { prisma } from "~/utils/context";
import { revalidatePath } from "next/cache";
import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Campaign, Character, Friendship, Message, User } from "@prisma/client";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(8, "1 m"),
});

interface Response {
  status: "SUCCESS" | "ERROR" | "FAILED";
  message: string;
}

interface SendMessageProps {
  userId: User["clerkId"];
  friendId: Message["recipientId"];
  content: Message["content"];
}

export const sendMessage = async ({
  userId,
  friendId,
  content,
}: SendMessageProps): Promise<Message | undefined> => {
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

interface QueryFriendChatProps {
  userId: User["clerkId"];
  friendSenderId: string;
}

export const queryFriendChat = async ({
  userId,
  friendSenderId,
}: QueryFriendChatProps): Promise<Message[] | undefined> => {
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
        sentAt: "desc",
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

interface HandleFriendRequestProps {
  response: "ACCEPTED" | "DECLINED";
  senderId: Friendship["senderId"];
  receiverId: Friendship["receiverId"];
}

export const handleFriendRequest = async ({
  response,
  senderId,
  receiverId,
}: HandleFriendRequestProps): Promise<Response | undefined> => {
  if (response === "ACCEPTED") {
    await prisma.friendship.updateMany({
      where: {
        senderId: senderId,
        receiverId: receiverId,
      },
      data: {
        status: "ACCEPTED",
      },
    });
    revalidatePath("/messages");
    return { status: "SUCCESS", message: "Friend request was accepted" };
  } else {
    await prisma.friendship.deleteMany({
      where: {
        senderId: senderId,
        receiverId: receiverId,
      },
    });
    revalidatePath("/messages");
    return { status: "SUCCESS", message: "Friend request was declined" };
  }
};

interface SendFriendRequestProps {
  receiverName: Friendship["receiverId"];
  senderName: Friendship["senderId"];
  userId: User["clerkId"];
}

export const sendFriendRequest = async ({
  receiverName,
  senderName,
  userId,
}: SendFriendRequestProps): Promise<Response | undefined> => {
  try {
    const friendRequest = await prisma.friendship.findFirst({
      where: {
        OR: [
          {
            receiverName: receiverName,
            senderId: userId,
          },
          {
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
    return { status: "SUCCESS", message: "Friend request was sent!" };
  } catch (error) {
    console.error("error: ", error);
    return {
      status: "ERROR",
      message: "Something went wrong. Please try again.",
    };
  }
};

interface HandleCampaignInvite {
  campaignId: Campaign["id"];
  userId: User["clerkId"];
  response: "ACCEPTED" | "DECLINED";
}

export const handleCampaignInvite = async ({
  campaignId,
  userId,
  response,
}: HandleCampaignInvite): Promise<Campaign | undefined> => {
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

interface InviteToCampaignProps {
  playerId: User["clerkId"];
  campaignId: Campaign["id"];
}

export const inviteToCampaign = async ({
  playerId,
  campaignId,
}: InviteToCampaignProps): Promise<Response | undefined> => {
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

interface CreateNewCharacterProps {
  userId: User["clerkId"];
}

export const createNewCharacterSheet = async ({
  userId,
}: CreateNewCharacterProps): Promise<Character | undefined> => {
  const newCharacter = prisma.character.create({
    data: {
      userId,
      charname: "New Character",
    },
  });
  revalidatePath("/messages");
  return newCharacter;
};

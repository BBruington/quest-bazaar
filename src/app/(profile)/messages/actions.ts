"use server";

import { prisma } from "~/utils/context";
import { revalidatePath } from "next/cache";

export const handleReceivedFriendRequest = async ({
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
      console.log("failed to find friend");
      return { status: "ERROR", message: "failed to find friend" };
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
      return { status: "ERROR", message: "failed to find friend" };
    }
    const pendingFriend = await prisma.friendship.create({
      data: {
        receiverId: recipient.clerkId,
        receiverName: receiverName,
        receiverImgUrl: recipient.imgUrl,
        senderId: userId,
        senderName: senderName,
        senderImgUrl: sender.imgUrl,
        status: "PENDING",
      },
    });

    revalidatePath("/messages");
    return { status: "ACCEPTED", message: "Friend request was sent!" };
  } catch (error) {
    console.error("error: ", error);
    return { status: "ERROR", message: "failed to find friend" };
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

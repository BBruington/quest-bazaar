"use server";

import { prisma } from "~/utils/context";
import { revalidatePath } from "next/cache";

export const testAddUser = async () => {
  await prisma.user.create({
    data: {
      username: "testUser",
      clerkId: "testid",
      email: "testEmail@gmail.com",
    },
  });
};

export const addFriendRequest = async ({
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
      return {status: "ERROR"};
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
      return {status: "ERROR"};
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

    revalidatePath("/profile/edit");
    return {status: "ACCEPTED"};
  } catch (error) {
    console.error("error: ", error);
    return {status: "ERROR"};
  }
};

export const handleCampaignInvite = async ({
  campaignId,
  userId,
  campaignRes,
}) => {
  if (campaignRes === "ACCEPTED") {
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
      return updatedCampaign;
    } catch (error) {
      console.error("Error updating campaign: ", error);
      throw error;
    }
  }
};
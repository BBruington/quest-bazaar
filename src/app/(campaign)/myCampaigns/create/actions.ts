import { prisma } from "~/utils/context";
import { TRPCError } from "@trpc/server";
import { Campaign, User } from "@prisma/client";

interface Friends {
  name: User["username"]
  id: User["clerkId"]
}

interface CreateCampaignProps {
  userId: User["clerkId"]
  title: Campaign["name"]
  description: Campaign["description"]
  dmProfileImg: User['imgUrl']
  dmName: Campaign["dmName"]
  imageUrl: Campaign["image"]
  friends: Friends[] | undefined
}

export const createCampaign = async ({userId, title, description, dmProfileImg, dmName, imageUrl, friends}: CreateCampaignProps) => {
  const campaignData = await prisma.campaign.create({
    data: {
      name: title,
      description: description,
      image: imageUrl,
      dmName: dmName,
      dmProfileImg: dmProfileImg,
      dmUserId: userId,
    },
  });
  if (!campaignData) throw new TRPCError({ code: "NOT_FOUND" });
  if (friends !== undefined) {
    await prisma.campaign.update({
      where: {
        id: campaignData.id,
      },
      data: {
        invitedPlayers: {
          connect:
            friends?.map((friendId) => ({
              clerkId: friendId.id,
            })) || [],
        },
      },
    });
  }
  return campaignData;
}
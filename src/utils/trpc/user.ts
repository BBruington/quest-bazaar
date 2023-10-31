import { TRPCError } from "@trpc/server";
import { prisma } from "../context";
import z from "zod";
import { t } from "../trpc-server";

export const queryUser = t.procedure
  .input(
    z.object({
      email: z.string(),
    })
  )
  .query(async ({ input }) => {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) throw new TRPCError({ code: "NOT_FOUND" });

    return user;
  });

export const queryUserCampaigns = t.procedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(async ({ input }) => {
    const userCampaignsData = await prisma.user.findUnique({
      where: { clerkId: input.id },
      include: {
        campaignplayer: true,
        campaigndm: true,
      },
    });
    const userCampaigns = [
      ...userCampaignsData!.campaigndm,
      ...userCampaignsData!.campaignplayer,
    ];
    if (userCampaigns === undefined) throw new TRPCError({ code: "NOT_FOUND" });
    if (!userCampaigns) return null;
    return userCampaigns;
  });

  export const queryUserSpecificCampaign = t.procedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(async ({ input }) => {
    const userCampaignData = await prisma.campaign.findUnique({
      where: { id: input.id },
    });

    return userCampaignData;
  })
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  queryUser: publicProcedure.input(z.object({
    email: z.string(),
  })).query(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {email: input.email}
    });

    if (!user) throw new TRPCError({ code: "NOT_FOUND"});

    return user;
  }),

  queryUserCampaigns: publicProcedure.input(z.object({
    id: z.string(),
  })).query( async ({ ctx, input }) => {
    const userCampaignsData = await ctx.prisma.user.findUnique({
      where: {externalId: input.id},
      include: {
        campaignplayer: true,
        campaigndm: true,
      },
    });
    const userCampaigns = [...userCampaignsData!.campaigndm,  ...userCampaignsData!.campaignplayer]

    if (!userCampaigns) throw new TRPCError({ code: "NOT_FOUND"});
    
    return userCampaigns;
  }),
  queryUserSpecificCampaign: publicProcedure.input(z.object({
    id: z.string(),
  })).query( async ({ ctx, input }) => {
    const userCampaignData = await ctx.prisma.campaign.findUnique({
      where: {id: input.id},
    })

    return userCampaignData;
  }),

  queryCampaigns: publicProcedure.query( async ({ ctx }) => {
    const allCampaigns = await ctx.prisma.campaign.findMany();
    return allCampaigns;
  })

  // createUser: publicProcedure.input(z.object({
  //   email: z.string(),
  //   username: z.string().optional(),
  // })).mutation(async ({ctx, input}) => {
  //   const newUser = await ctx.prisma.user.create({ data: {...input} });

  //   return newUser;
  // }),
});

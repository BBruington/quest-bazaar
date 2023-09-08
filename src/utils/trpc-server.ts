import {initTRPC} from '@trpc/server';
import { TRPCError } from "@trpc/server";
import {prisma} from  "../utils/context"
import { z } from 'zod';

const t = initTRPC.create();

// this is our RPC API
export const appRouter = t.router({
  queryUser: t.procedure.input(z.object({
      email: z.string(),
    })).query(async ({ ctx, input }) => {
      const user = await prisma.user.findUnique({
        where: {email: input.email}
      });
  
      if (!user) throw new TRPCError({ code: "NOT_FOUND"});
  
      return user;
    }),
  
  queryUserCampaigns: t.procedure.input(z.object({
    id: z.string(),
  })).query( async ({ ctx, input }) => {
    const userCampaignsData = await prisma.user.findUnique({
      where: {externalId: input.id},
      include: {
        campaignplayer: true,
        campaigndm: true,
      },
    });
    const userCampaigns = [...userCampaignsData!.campaigndm,  ...userCampaignsData!.campaignplayer]

    if (!userCampaigns) throw new TRPCError({ code: "NOT_FOUND"});
    console.log(userCampaigns)
    return userCampaigns;
  }),
  queryUserSpecificCampaign: t.procedure.input(z.object({
    id: z.string(),
  })).query( async ({ ctx, input }) => {
    const userCampaignData = await prisma.campaign.findUnique({
      where: {id: input.id},
    })

    return userCampaignData;
  }),

  queryCampaigns: t.procedure.query( async ({ ctx }) => {
    const allCampaigns = await prisma.campaign.findMany();
    return allCampaigns;
  }),

  createCampaign: t.procedure.input(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
  })).mutation( async ({ctx, input}) => {
    const campaignData = await prisma.campaign.create({
      data: {
        name: input.name,
        description: input.description,
        dmUserId: input.id,
      },
    })
    if (!campaignData) throw new TRPCError({ code: "NOT_FOUND"});
    return campaignData;
  }),

  // createUser: t.procedure.input(z.object({
  //   email: z.string(),
  //   username: z.string().optional(),
  // })).mutation(async ({ctx, input}) => {
  //   const newUser = await ctx.prisma.user.create({ data: {...input} });

  //   return newUser;
  // }),
});

export type AppRouter = typeof appRouter;
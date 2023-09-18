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

  deleteCampaign: t.procedure.input(z.object({
    id: z.string(),
  })).mutation( async ({ctx, input}) => {
    const deleted = await prisma.campaign.delete({
      where: {
        id: input.id
      }
    })
    return deleted;
  }),

  upsertCampaignNote: t.procedure.input(z.object({
    id: z.string(),
    campaignId: z.string(),
    title: z.string(),
    content: z.string(),
  })).mutation( async ({ctx, input}) => {
    const upsertCampaign = await prisma.campaignNote.upsert({
      where: {
        id: input.id,
      },
      update: {
        title: input.title,
        content: input.content
      },
      create: {
        campaignId: input.campaignId,
        title: input.title,
        content: input.content
      },
    })
    return upsertCampaign;
  }),

  queryPost: t.procedure.input(z.object({
    id: z.string()
  })).query( async ({ctx, input}) => {
    try{
      const post = await prisma.userPost.findUnique({
        where: {
          id: input.id
        }
      })
      return post;

    } catch (e) {
      console.error(e)
      return null;
    }
  }),

  addFriend: t.procedure.input(z.object({
    name: z.string(),
    id: z.string()
  })).mutation( async ({ctx, input}) => {
    try{
      const recipient = await prisma.user.findUnique({
        where: {
          username: input.name
        },
        select: {
          externalId: true
        },
      });
      if(recipient === null) {
        console.log("failed to find friend")
        return false;
      }
      const pendingFriend = await prisma.friendship.create({
        data: {
          receiverId: recipient.externalId,
          senderId: input.id,
          status: "PENDING"
        },
      })

      return pendingFriend;
    } catch (error) {
      console.error("error: ", error);
      return false;
    }
  })

  
});

export type AppRouter = typeof appRouter;
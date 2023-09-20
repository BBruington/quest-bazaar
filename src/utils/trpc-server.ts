import {initTRPC} from '@trpc/server';
import { TRPCError } from "@trpc/server";
import {prisma} from  "../utils/context"
import { z } from 'zod';

const t = initTRPC.create();

// this is our RPC API
export const appRouter = t.router({
  queryUser: t.procedure.input(z.object({
      email: z.string(),
    })).query(async ({  input }) => {
      const user = await prisma.user.findUnique({
        where: {email: input.email}
      });
  
      if (!user) throw new TRPCError({ code: "NOT_FOUND"});
  
      return user;
    }),
  
  queryUserCampaigns: t.procedure.input(z.object({
    id: z.string(),
  })).query( async ({  input }) => {
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
  })).query( async ({  input }) => {
    const userCampaignData = await prisma.campaign.findUnique({
      where: {id: input.id},
    })

    return userCampaignData;
  }),

  queryCampaigns: t.procedure.query( async () => {
    const allCampaigns = await prisma.campaign.findMany();
    return allCampaigns;
  }),

  createCampaign: t.procedure.input(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
  })).mutation( async ({ input}) => {
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
  })).mutation( async ({ input}) => {
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
  })).mutation( async ({ input}) => {
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
  })).query( async ({ input}) => {
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
    receiverName: z.string(),
    senderName: z.string(),
    id: z.string()
  })).mutation( async ({input}) => {
    try{
      const recipient = await prisma.user.findUnique({
        where: {
          username: input.receiverName
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
          receiverName: input.receiverName,
          senderId: input.id,
          senderName: input.senderName,
          status: "PENDING"
        },
      })

      return pendingFriend;
    } catch (error) {
      console.error("error: ", error);
      return false;
    }
  }),

  queryMyFriendRequests: t.procedure.input( z.object({
    id: z.string()
  })).query(async ({input}) => {

    const myRequests = await prisma.friendship.findMany({
      where: {
        receiverId: input.id
      }
    })

    return myRequests;
  }),

  handleFriendRequest: t.procedure.input( z.object({
    response: z.string(),
    senderId: z.string(),
    receiverId: z.string(),
  })).mutation(async ({ input }) => {
    if( input.response === "ACCEPTED") {
      const acceptedFriend = await prisma.friendship.updateMany({
        where: {
          senderId: input.senderId,
          receiverId: input.receiverId
        },
        data: {
          status: "ACCEPTED"
        }
      });
      return acceptedFriend
    } else {
      const declinedFriend = await prisma.friendship.deleteMany({
        where: {
          senderId: input.senderId,
          receiverId: input.receiverId
        }
      })

      return declinedFriend
    }
  })

  
});

export type AppRouter = typeof appRouter;
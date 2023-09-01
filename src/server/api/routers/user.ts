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

  // queryUserCampaigns: publicProcedure.input(z.object({
  //   email: z.string(),
  // })).query( async ({ ctx, input }) => {
  //   const userCampaigns = await ctx.prisma.user.findUnique({
  //     where: {email: input.email},
  //     include: {
  //       campaignplayer: true,
  //       campaigndm: true,
  //     },
  //   });

  //   if (!userCampaigns) throw new TRPCError({ code: "NOT_FOUND"});
    
  //   return {
  //     ...userCampaigns.campaigndm,
  //     ...userCampaigns.campaignplayer
  //   }
  // }),

  // createUser: publicProcedure.input(z.object({
  //   email: z.string(),
  //   username: z.string().optional(),
  // })).mutation(async ({ctx, input}) => {
  //   const newUser = await ctx.prisma.user.create({ data: {...input} });

  //   return newUser;
  // }),
});

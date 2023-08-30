import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({

  createUser: publicProcedure.input(z.object({
    email: z.string(),
    username: z.string().optional(),
  })).mutation(async ({ctx, input}) => {
    const newUser = await ctx.prisma.user.create({ data: {...input} });

    return newUser;
  })
});

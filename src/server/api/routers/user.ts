import { z } from "zod";
import { UserSchema } from "types/Types";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),

  createUser: publicProcedure.input(UserSchema).mutation(async ({ctx, input}) => {
    const newUser = await ctx.prisma.user.create({ data: input });

    return newUser;
  })
});

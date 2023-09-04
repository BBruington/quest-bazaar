import type { inferAsyncReturnType } from '@trpc/server';
import { PrismaClient } from '@prisma/client'; 
import { env } from "~/env.mjs";
/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
export const prisma =
globalForPrisma.prisma ??
new PrismaClient({
  log:
    env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});
 
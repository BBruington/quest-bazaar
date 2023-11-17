
import type { AppRouter } from "./trpc-server";
import { createTRPCReact } from "@trpc/react-query";

export const api = createTRPCReact<AppRouter>();

import { z } from "zod";

export const creatCampaignSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters." }),
});

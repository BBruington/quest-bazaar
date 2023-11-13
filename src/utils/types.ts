import { z } from "zod";


export const friendsForCampaignInvite = z.object({
  id: z.string(),
  name: z.string()
})
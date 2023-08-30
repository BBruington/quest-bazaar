import { z } from "zod";
// model User {
//   id         String      @id @default(cuid())
//   username   String?     @unique
//   email      String      @unique
//   createdAt  DateTime    @default(now())
//   updatedAt  DateTime    @updatedAt
//   characters Character[]
//   campaigns  Campaign[]  @relation("CampaignPlayers")
//   userPosts  UserPost[]
//   likes      Like[]
//   comments   Comment[]
//   campaign   Campaign[]
// }

export const UserSchema = z.object({
  id: z.string().cuid(),
  username: z.string().optional(),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date(),
  characters: z.array(z.string().cuid()).optional(),
  campaigns: z.array(z.string().cuid()).optional(),
  userPosts: z.array(z.string().cuid()).optional(),
  likes: z.array(z.string().cuid()).optional(),
  comments: z.array(z.string().cuid()).optional(),
  campaign: z.array(z.string().cuid()).optional(),
})
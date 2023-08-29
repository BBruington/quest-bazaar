import { z } from "zod";
// id         Int         @id @default(autoincrement())
// username   String      @unique
// email      String      @unique
// password   String
// createdAt  DateTime    @default(now())
// updatedAt  DateTime    @updatedAt
// characters Character[]
// campaigns  Campaign[]  @relation("CampaignPlayers")
// userPosts UserPost[]
// likes      Like[]
// comments   Comment[]
// Campaign   Campaign[]

export const UserSchema = z.object({
  id: z.string().cuid(),
  username: z.string().optional(),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type UserRelations = {
  // characters: z.array(),
  // campaigns: z.array(),
  // forumPosts: z.array(),
  // likes: z.array(),
  // comments: z.array(),
  // campaign: z.array()
}
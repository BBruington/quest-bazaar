import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { TRPCError } from "@trpc/server";
import { prisma } from "../utils/context";
import { friendsForCampaignInvite } from "./types";
import { z } from "zod";

export const t = initTRPC.create();
//clerkId
// this is our RPC API
export const appRouter = t.router({
  queryUser: t.procedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { email: input.email },
      });

      if (!user) throw new TRPCError({ code: "NOT_FOUND" });

      return user;
    }),

  queryUserCampaigns: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const userCampaignsData = await prisma.user.findUnique({
        where: { clerkId: input.id },
        include: {
          campaignplayer: true,
          campaigndm: true,
        },
      });
      const userCampaigns = [
        ...userCampaignsData!.campaigndm,
        ...userCampaignsData!.campaignplayer,
      ];
      if (userCampaigns === undefined)
        throw new TRPCError({ code: "NOT_FOUND" });
      if (!userCampaigns) return null;
      return userCampaigns;
    }),

  queryUserSpecificCampaign: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const userCampaignData = await prisma.campaign.findUnique({
        where: { id: input.id },
      });

      return userCampaignData;
    }),

  queryCampaigns: t.procedure.query(async () => {
    const allCampaigns = await prisma.campaign.findMany();
    return allCampaigns;
  }),

  queryUserInvitedCampaigns: t.procedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const userCampaignsData = await prisma.user.findUnique({
        where: { clerkId: input.userId },
        include: {
          invitedCampaigns: true,
        },
      });
      const userCampaigns = [...userCampaignsData!.invitedCampaigns];
      if (userCampaigns === undefined)
        throw new TRPCError({ code: "NOT_FOUND" });
      if (!userCampaigns) return null;
      return userCampaigns;
    }),

  handleCampaignInvite: t.procedure
    .input(
      z.object({
        campaignId: z.string(),
        userId: z.string(),
        campaignRes: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.campaignRes === "ACCEPTED") {
        try {
          const updatedCampaign = await prisma.campaign.update({
            where: {
              id: input.campaignId,
            },
            data: {
              players: {
                connect: {
                  clerkId: input.userId,
                },
              },
              invitedPlayers: {
                disconnect: {
                  clerkId: input.userId,
                },
              },
            },
          });
          return updatedCampaign;
        } catch (error) {
          console.error("Error updating campaign: ", error);
          throw error;
        }
      } else {
        try {
          const updatedCampaign = await prisma.campaign.update({
            where: {
              id: input.campaignId,
            },
            data: {
              invitedPlayers: {
                disconnect: {
                  clerkId: input.userId,
                },
              },
            },
          });
          return updatedCampaign;
        } catch (error) {
          console.error("Error updating campaign: ", error);
          throw error;
        }
      }
    }),

  createCampaign: t.procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        imageUrl: z.string(),
        friendsIds: z.array(friendsForCampaignInvite).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const campaignData = await prisma.campaign.create({
        data: {
          name: input.name,
          description: input.description,
          image: input.imageUrl,
          dmUserId: input.id,
        },
      });
      if (!campaignData) throw new TRPCError({ code: "NOT_FOUND" });
      if (input.friendsIds !== undefined) {
        await prisma.campaign.update({
          where: {
            id: campaignData.id,
          },
          data: {
            invitedPlayers: {
              connect:
                input.friendsIds?.map((friendId) => ({
                  clerkId: friendId.id,
                })) || [],
            },
          },
        });
      }
      return campaignData;
    }),

  deleteCampaign: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.campaignNote.deleteMany({
        where: {
          campaignId: input.id,
        },
      });
      const deleted = await prisma.campaign.delete({
        where: {
          id: input.id,
        },
      });
      return deleted;
    }),

  createCampaignScheduledEvent: t.procedure
    .input(
      z.object({
        time: z.string(),
        date: z.string(),
        scheduledEvent: z.string(),
        campaignId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const scheduledEvent = await prisma.campaignSchedules.create({
        data: {
          campaignId: input.campaignId,
          time: input.time,
          date: input.date,
          scheduledEvent: input.scheduledEvent,
        },
      });

      return scheduledEvent;
    }),

  queryCampaignMessages: t.procedure
    .input(
      z.object({
        campaignId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const messages = await prisma.campaignChat.findMany({
        where: {
          campaignId: input.campaignId,
        },
      });
      return messages;
    }),

  sendChatMessage: t.procedure
    .input(
      z.object({
        campaignId: z.string(),
        username: z.string(),
        chat: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const sentMessage = await prisma.campaignChat.create({
        data: {
          campaignId: input.campaignId,
          username: input.username,
          chat: input.chat,
        },
      });
      return sentMessage;
    }),

  queryCampaignScheduledEvents: t.procedure
    .input(
      z.object({
        campaignId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const scheduledEvents = await prisma.campaignSchedules.findMany({
        where: {
          campaignId: input.campaignId,
        },
        orderBy: {
          date: "asc",
        },
      });

      return scheduledEvents;
    }),

  deleteCampaignScheduledEvent: t.procedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.campaignSchedules.delete({
        where: {
          id: input.eventId,
        },
      });
    }),

  requestInviteToCampaign: t.procedure
    .input(z.object({ userId: z.string(), campaignId: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const campaign = await prisma.campaign.findUnique({
          where: { id: input.campaignId },
          include: { invitedPlayers: true, players: true }, // Include invitedPlayers relation
        });
        if (!campaign) {
          throw new Error("Campaign not found");
        }
        if (
          campaign.players.find((player) => player.clerkId === input.userId)
        ) {
          return "ALREADY_PLAYER";
        }
        const updatedCampaign = await prisma.campaign.update({
          where: {
            id: input.campaignId,
          },
          data: {
            invitedPlayers: {
              connect: {
                clerkId: input.userId,
              },
            },
          },
        });
        return updatedCampaign;
      } catch (error) {
        console.error("error: ", error);
      }
    }),

  inviteToCampaign: t.procedure
    .input(
      z.object({
        playerId: z.string(),
        campaignId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const campaign = await prisma.campaign.findUnique({
          where: { id: input.campaignId },
          include: { invitedPlayers: true, players: true }, // Include invitedPlayers relation
        });
        if (!campaign) {
          throw new Error("Campaign not found");
        }
        if (
          campaign.players.find((player) => player.clerkId === input.playerId)
        ) {
          return "ALREADY_PLAYER";
        }
        const updatedCampaign = await prisma.campaign.update({
          where: {
            id: input.campaignId,
          },
          data: {
            invitedPlayers: {
              connect: {
                clerkId: input.playerId,
              },
            },
          },
        });
        return updatedCampaign;
      } catch (error) {
        console.error("error: ", error);
      }
    }),

  queryCampaignData: t.procedure
    .input(
      z.object({
        campaignId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const campaignData = await prisma.campaign.findUnique({
        where: {
          id: input.campaignId,
        },
        include: {
          players: true,
        },
      });
      return campaignData;
    }),

  upsertCampaignNote: t.procedure
    .input(
      z.object({
        id: z.string().optional(),
        userId: z.string(),
        private: z.boolean(),
        campaignId: z.string(),
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const upsertCampaign = await prisma.campaignNote.upsert({
        where: {
          id: input.id,
        },
        update: {
          title: input.title,
          content: input.content,
        },
        create: {
          userId: input.userId,
          private: input.private,
          campaignId: input.campaignId,
          title: input.title,
          content: input.content,
        },
      });
      return upsertCampaign;
    }),

  deleteCampaignNote: t.procedure
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.id) {
        try {
          await prisma.campaignNote.delete({
            where: { id: input.id },
          });
        } catch (e) {
          console.error(e);
        }
      }
    }),

  queryCampaignPrivateNotes: t.procedure
    .input(z.object({ campaignId: z.string(), userId: z.string() }))
    .query(async ({ input }) => {
      try {
        const myNotes = await prisma.campaignNote.findMany({
          where: {
            campaignId: input.campaignId,
            userId: input.userId,
            private: true,
          },
        });
        return myNotes;
      } catch (e) {
        console.error(e);
      }
    }),

  queryCampaignNotes: t.procedure
    .input(
      z.object({
        campaignId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const notes = await prisma.campaignNote.findMany({
          where: {
            campaignId: input.campaignId,
            private: false,
          },
        });
        return notes;
      } catch (e) {
        console.error("error", e);
      }
    }),
  // userId         String
  // players        Int?
  // startingLevel  Int?
  // finishingLevel Int?
  // title          String
  // description    String
  // author         String
  // mainImage      String
  // body           String
  // campaignId     String

  createCampaignPost: t.procedure
    .input(
      z.object({
        userId: z.string(),
        campaignId: z.string(),
        players: z.number(),
        startingLevel: z.number(),
        finishingLevel: z.number(),
        title: z.string(),
        description: z.string(),
        author: z.string(),
        mainImage: z.string(),
        body: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const post = await prisma.post.upsert({
          where: {
            id: "123",
            // campaignId: input.campaignId
          },
          update: {
            players: input.players,
            startingLevel: input.startingLevel,
            finishingLevel: input.finishingLevel,
            title: input.title,
            description: input.description,
            author: input.author,
            mainImage: input.mainImage,
            body: input.body,
          },
          create: {
            campaignId: input.campaignId,
            userId: input.userId,
            players: input.players,
            startingLevel: input.startingLevel,
            finishingLevel: input.finishingLevel,
            title: input.title,
            description: input.description,
            author: input.author,
            mainImage: input.mainImage,
            body: input.body,
          },
        });
        return post;
      } catch (e) {
        console.error(e);
      }
    }),

  queryCampaignPosts: t.procedure.query(async () => {
    try {
      const posts = await prisma.post.findMany({
        include: {
          comments: true,
          likes: true,
        },
      });
      return posts;
    } catch (e) {
      console.error(e);
      return null;
    }
  }),

  querySinglePost: t.procedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input }) => {
      try {
        const post = await prisma.post.findUnique({
          where: {
            id: input.postId,
          },
          include: {
            comments: true,
            likes: true,
          },
        });
        return post;
      } catch (e) {
        console.error(e);
        return null;
      }
    }),

  addFriend: t.procedure
    .input(
      z.object({
        receiverName: z.string(),
        senderName: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const recipient = await prisma.user.findUnique({
          where: {
            username: input.receiverName,
          },
          select: {
            clerkId: true,
            imgUrl: true,
          },
        });
        if (recipient === null) {
          console.log("failed to find friend");
          return false;
        }
        const sender = await prisma.user.findUnique({
          where: {
            clerkId: input.userId,
          },
          select: {
            clerkId: true,
            imgUrl: true,
          },
        });
        if (sender === null) {
          console.log("failed to find friend");
          return false;
        }
        const pendingFriend = await prisma.friendship.create({
          data: {
            receiverId: recipient.clerkId,
            receiverName: input.receiverName,
            receiverImgUrl: recipient.imgUrl,
            senderId: input.userId,
            senderName: input.senderName,
            senderImgUrl: sender.imgUrl,
            status: "PENDING",
          },
        });

        return pendingFriend;
      } catch (error) {
        console.error("error: ", error);
        return false;
      }
    }),

  queryMyFriendRequests: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const myRequests = await prisma.friendship.findMany({
        where: {
          OR: [
            {
              receiverId: input.id,
            },
            {
              senderId: input.id,
            },
          ],
          AND: [
            {
              status: "PENDING",
            },
          ],
        },
      });

      return myRequests;
    }),

  queryMyFriends: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const myRequests = await prisma.friendship.findMany({
        where: {
          OR: [
            {
              receiverId: input.id,
            },
            {
              senderId: input.id,
            },
          ],
          AND: [
            {
              status: "ACCEPTED",
            },
          ],
        },
      });

      return myRequests;
    }),

  handleFriendRequest: t.procedure
    .input(
      z.object({
        response: z.string(),
        senderId: z.string(),
        receiverId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.response === "ACCEPTED") {
        const acceptedFriend = await prisma.friendship.updateMany({
          where: {
            senderId: input.senderId,
            receiverId: input.receiverId,
          },
          data: {
            status: "ACCEPTED",
          },
        });
        return acceptedFriend;
      } else {
        const declinedFriend = await prisma.friendship.deleteMany({
          where: {
            senderId: input.senderId,
            receiverId: input.receiverId,
          },
        });

        return declinedFriend;
      }
    }),

  queryFriendMessages: t.procedure
    .input(
      z.object({
        userId: z.string(),
        friendSenderId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const messagesData = await prisma.message.findMany({
          where: {
            OR: [
              {
                senderId: input.userId,
              },
              {
                recipientId: input.userId,
              },
            ],
          },
          orderBy: {
            sentAt: "asc",
          },
        });
        const filteredMessages = messagesData.filter((message) => {
          return (
            message.senderId === input.friendSenderId ||
            message.recipientId === input.friendSenderId
          );
        });
        return filteredMessages;
      } catch {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }
    }),

  sendMessage: t.procedure
    .input(
      z.object({
        userId: z.string(),
        friendId: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const message = await prisma.message.create({
          data: {
            senderId: input.userId,
            recipientId: input.friendId,
            content: input.content,
          },
        });
        return message;
      } catch {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }
    }),
});

export type AppRouter = typeof appRouter;
